/**
 * Este script automatiza a geração de recursos e o upload para o servidor de
 * atualizações.
 *
 * Uso: `upload <plataforma> <caminho da chave de assinatura>`
 * - plataforma: A plataforma da atualização, deve ser "ios" ou "android".
 * - caminho: O caminho no sistema de arquivos da chave privada de assinaturas.
 *
 * Variáveis de ambiente necessárias:
 * - SIGNING_KEY_ID: O id da chave de assinatura, esperado pelo Expo.
 * - URL: O URL de base do servidor de atualizações.
 * - PLANNER_CHANNEL: Em qual canal a atualização deve ser publicada.
 * - PLANNER_UPLOAD_TOKEN: Um token Bearer que autoriza o usuário a fazer POSTs
 *   no servidor de atualizações.
 */

const { spawn } = require("child_process");
const { getConfig } = require("@expo/config");
const { readFileSync, createReadStream } = require("fs");
const { join, basename } = require("node:path");
const { createHash, createSign, createPrivateKey } = require("crypto");
const { getType } = require("mime");
const prompt = require("prompt-sync")();
const canonicalJson = require("canonical-json");
const FormData = require("form-data");
const axios = require("axios");

const SIGNING_KEY_ID = process.env.SIGNING_KEY_ID;
const URL = process.env.URL;
const UPLOAD_URL = URL + "/ru_api/updates/v1/upload";
const MANIFEST_URL = URL + "/ru_api/updates/v1/manifest";
const SIGN_URL = URL + "/ru_api/updates/v1/sign";
const OUT_DIR = "./dist";

let privateKey = null;
let platform = null;
let channel = null;
let token = null;

async function main() {
  platform = process.argv[2];
  const signingKeyPath = process.argv[3];
  if (platform == null || signingKeyPath == null) {
    console.error("Usage: upload <platform> <signing key path>");
    return;
  }

  if (["ios", "android"].indexOf(platform) == -1) {
    console.error(`the platform "${platform}" must be either ios or android`);
    return;
  }

  channel = process.env.PLANNER_CHANNEL;
  if (channel == null) {
    console.error("The PLANNER_CHANNEL environment variable is missing");
    return;
  }

  token = process.env.PLANNER_UPLOAD_TOKEN;
  if (token == null) {
    console.error("The PLANNER_UPLOAD_TOKEN environment variable is missing");
    return;
  }

  try {
    const passphrase = prompt.hide("Signing key passphrase: ");
    privateKey = createPrivateKey({
      key: readFileSync(signingKeyPath),
      passphrase,
    });
  } catch (e) {
    console.error("Failed acquiring the signing key: " + e.toString());
    process.exit(1);
  }

  const args = [
    "export",
    "--dump-sourcemap",
    "--platform",
    platform,
    "--output-dir",
    OUT_DIR,
  ];

  const expo = spawn("expo", args, { stdio: "inherit" });
  expo.on("close", afterMain);
}

function getManifestAsset(metaEntry, url) {
  const hasher = createHash("sha256");
  hasher.update(readFileSync(join(OUT_DIR, metaEntry.path)));
  return {
    hash: hasher.digest().toString("base64url"),
    key: basename(metaEntry.path),
    contentType: getType(metaEntry.ext),
    fileExtension: "." + metaEntry.ext,
    url,
  };
}

function getManifestBundleAsset(path, url) {
  const hasher = createHash("sha256");
  hasher.update(readFileSync(join(OUT_DIR, path)));
  const re = new RegExp("^" + platform + "\\-([^\\.]+)\\.[^\\.]+$");
  return {
    hash: hasher.digest().toString("base64url"),
    key: re.exec(basename(path))[1],
    contentType: "application/javascript",
    url,
  };
}

async function afterMain() {
  const { exp } = getConfig("./", { isPublicConfig: true });

  const meta = JSON.parse(readFileSync(join(OUT_DIR, "metadata.json")));
  console.log(meta);

  const file_meta = meta.fileMetadata[platform];
  const asset_ids = [];
  for (const asset of file_meta.assets) {
    const filename = basename(asset.path) + "." + asset.ext;
    console.log(`Uploading ${filename}...`);
    const form = new FormData();
    form.append(filename, createReadStream(join(OUT_DIR, asset.path)));
    asset_ids.push((await axios({
      method: "post",
      url: UPLOAD_URL,
      data: form,
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).catch((e) => {
      console.error(`There was an error uploading ${filename}`);
      console.error(e.toString());
      process.exit(1);
    })).data.id);
  }

  const filename = basename(file_meta.bundle).slice(platform.length + 1);
  console.log(`Uploading bundle ${filename}...`);
  const form = new FormData();
  form.append(filename, createReadStream(join(OUT_DIR, file_meta.bundle)));
  const bundle_id = (await axios({
    method: "post",
    url: UPLOAD_URL,
    data: form,
    headers: {
      "Authorization": "Bearer " + token,
    },
  }).catch((e) => {
    console.error(`There was an error uploading the bundle ${filename}`);
    console.error(e.toString());
    process.exit(1);
  })).data.id;

  const manifest_request = {
    runtimeVersion: "exposdk:" + exp.sdkVersion,
    channel: channel,
    platform: platform,
    launchAsset: bundle_id,
    assets: asset_ids,
    extra: {
      expoClient: exp,
    },
  };

  console.log("Creating update manifest...");
  const manifest_response = await axios({
    method: "post",
    url: MANIFEST_URL,
    data: manifest_request,
    headers: {
      "Authorization": "Bearer " + token,
    },
  }).catch((e) => {
    console.error("There was an error creating the update manifest");
    console.error(e.toString());
    process.exit(1);
  });

  const manifest = {
    id: manifest_response.data.id,
    createdAt: manifest_response.data.createdAt,
    runtimeVersion: manifest_request.runtimeVersion,
    assets: file_meta.assets.map((asset, index) =>
      // Essa iteração assume que a ordem do array de assets retornado pelo
      // serivor é a mesma que a definida por nós (e pelo bundler) na memória.
      // Isso é verdade pois o servidor ordena os resultados pela data de envio,
      // e nós enviamos arquivos sequencialmente.
      getManifestAsset(asset, manifest_response.data.assets[index].url)),
    launchAsset: getManifestBundleAsset(
      file_meta.bundle,
      manifest_response.data.launchAsset.url,
    ),
    metadata: {},
    extra: { expoClient: exp },
  };

  console.log("Attaching signature...");
  const signer = createSign("RSA-SHA256");
  signer.update(canonicalJson(manifest));

  await axios({
    method: "post",
    url: SIGN_URL,
    data: {
      keyId: SIGNING_KEY_ID,
      updateId: manifest_response.data.id,
      signature: signer.sign(privateKey).toString("base64"),
    },
    headers: {
      "Authorization": "Bearer " + token,
    },
  }).catch((e) => {
    console.error("There was an error posting the signature to the server");
    console.error(e.toString());
    process.exit(1);
  });

  console.log("Success!");
  console.log(`Update ID: ${manifest_response.data.id}`);
}

main();
