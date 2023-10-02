module.exports = {
  expo: {
    name: "UFSCar Planner",
    owner: "petbccufscar",
    slug: "ufscar-planner",
    version: "1.5.4",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#E8243C",
    },
    updates: {
      fallbackToCacheTimeout: 0,
      url: process.env.PLANNER_MANIFEST_URL,
      requestHeaders: {
        "ufscar-planner-channel": process.env.PLANNER_CHANNEL,
      },
      codeSigningCertificate: process.env.PLANNER_CHANNEL == "preview" ?
        "./signing/testing.crt" : "./signing/v1prodmiguel.crt",
      codeSigningMetadata: {
        alg: "rsa-v1_5-sha256",
        keyid: process.env.PLANNER_CHANNEL == "preview" ?
          "testing" : "v1prodmiguel",
      },
    },
    plugins: [
      "sentry-expo",
      [
        "expo-notifications",
        {
          icon: "./assets/adaptive-icon.png",
          color: "#E8243C",
          sounds: [],
        },
      ],
    ],
    assetBundlePatterns: [
      "**/*",
    ],
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#E8243C",
      },
      package: "com.pet.ufscarplanner",
      versionCode: 18,
      permissions: [
        "RECEIVE_BOOT_COMPLETED",
      ],
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    packagerOpts: {
      sourceExts: [
        "expo.ts",
        "expo.tsx",
        "expo.js",
        "expo.jsx",
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "wasm",
        "svg",
      ],
    },
    description: "",
    extra: {
      eas: {
        projectId: "5ff4fcf5-520f-4ac6-bc18-dd5d292dca98",
      },
    },
    hooks: {
      postPublish: [
        {
          file: "sentry-expo/upload-sourcemaps",
          config: {
            organization: "pet-bcc-ufscar",
            project: "ufscar-planner",
          },
        },
      ],
    },
    runtimeVersion: {
      policy: "sdkVersion",
    },
  },
};
