const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    asar: true,
    icon: "./src/icons/favicon.ico"
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-wix',
      config: {
        name: 'Polymath',
        manufacturer: 'Pritam Debnath',
        description: 'Intuitive Task Management App',
        version: '1.0.0',
        ui: {
          chooseInstallDir: true // Let user pick install folder
        },
        shortcuts: {
          desktop: true, // Create desktop shortcut
          startMenu: true // Create Start Menu shortcut
        },
        iconPath: './src/icons/favicon.ico'
      }
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
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
