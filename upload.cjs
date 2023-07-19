const { spawn } = require("child_process");
const { getConfig } = require("@expo/config");
const { readFileSync, createReadStream } = require("fs");
const { join, basename } = require("node:path");
const FormData = require("form-data");
const axios = require("axios");

const URL = process.env.URL;
const UPLOAD_URL = URL + "/ru_api/updates/v1/upload";
const MANIFEST_URL = URL + "/ru_api/updates/v1/manifest";
const OUT_DIR = "./dist";

let platform = null;
let channel = null;
let token = null;

async function main() {
  platform = process.argv[2];
  if (platform == null) {
    console.error("Usage: upload <platform>");
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

  console.log("Success!");
  console.log(`Update ID: ${manifest_response.data.id}`);
}

main();
