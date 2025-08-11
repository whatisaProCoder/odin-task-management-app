const { FusesPlugin } = require("@electron-forge/plugin-fuses");
const { FuseV1Options, FuseVersion } = require("@electron/fuses");
const path = require("path");

module.exports = {
  packagerConfig: {
    asar: true,
    icon: "app", // no .ico extension here
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "Polymath",
        authors: "Pritam Debnath",
        description: "Intuitive Task Management App",
        setupIcon: "app.ico", // installer icon
        iconUrl:
          "https://raw.githubusercontent.com/whatisaProCoder/whatisaProCoder/refs/heads/main/squirrel_app_icons/polymath.ico", // should be a publicly accessible .ico URL
        shortcutName: "Polymath", // shortcut name in Start Menu/Desktop
      },
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
