// const { withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
// module.exports = withModuleFederationPlugin({
//   shared: {
//     '@angular/core': { singleton: true, strictVersion: false, requiredVersion: '16.1.0' },
//     '@angular/common': { singleton: true, strictVersion: false, requiredVersion: '16.1.0' },
//     '@angular/router': { singleton: true, strictVersion: false, requiredVersion: '16.1.0' },
//     'rxjs': { singleton: true, strictVersion: false },
//     'zone.js': { singleton: true, strictVersion: false, requiredVersion: '0.13.0', eager: true },
//   },
// });

// const {
//   shareAll,
//   withModuleFederationPlugin,
// } = require("@angular-architects/module-federation/webpack");

// module.exports = withModuleFederationPlugin({
//   remotes: {
//     // no need to declare remotes as they are dynamically loaded.
//   },
//   shared: {
//     ...shareAll({
//       singleton: true,
//       strictVersion: false,
//       requiredVersion: "auto",
//     }),
//   },
// });
// const { withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

// module.exports = withModuleFederationPlugin({
//   // remotes: { ... } // se necessário
//   shared: {
//     '@angular/core': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
//     '@angular/common': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
//     '@angular/router': { singleton: true, strictVersion: false, requiredVersion: 'auto' },

//     // geralmente esquecidos, mas necessários:
//     '@angular/platform-browser': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
//     '@angular/forms': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
//     '@angular/common/http': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
//     '@angular/platform-browser/animations': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
//     '@angular/animations': { singleton: true, strictVersion: false, requiredVersion: 'auto' },

//     rxjs: { singleton: true, strictVersion: false, requiredVersion: 'auto' },
//     'zone.js': { singleton: true, strictVersion: false, requiredVersion: '0.13.0', eager: true },
//     tslib: { singleton: true, strictVersion: false, requiredVersion: 'auto' },
//   },
// });

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  output: {
    publicPath: 'auto',
  },
  optimization: {
    runtimeChunk: false,
  },
  experiments: {
    outputModule: true,
  },
  plugins: [
    new ModuleFederationPlugin({
        library: { type: "module" },
        remotes: {
        },
        filename: 'remoteEntry.js',
      shared: {
        '@angular/core':                { singleton: true, strictVersion: true, requiredVersion: '16.1.0' },
        '@angular/common':              { singleton: true, strictVersion: true, requiredVersion: '16.1.0' },
        '@angular/router':              { singleton: true, strictVersion: true, requiredVersion: '16.1.0' },
        '@angular/platform-browser':    { singleton: true, strictVersion: true, requiredVersion: '16.1.0' },
        '@angular/forms':               { singleton: true, strictVersion: true, requiredVersion: '16.1.0' },
        '@angular/common/http':         { singleton: true, strictVersion: true, requiredVersion: '16.1.0' },
        '@angular/platform-browser/animations': { singleton: true, strictVersion: true, requiredVersion: '16.1.0' },
        '@angular/animations':          { singleton: true, strictVersion: true, requiredVersion: '16.1.0' },
        rxjs:                           { singleton: true, strictVersion: true, requiredVersion: '7.8.0' },
        'zone.js':                      { singleton: true, strictVersion: true, requiredVersion: '0.13.0', eager: true },
        // tslib:                          { singleton: true, strictVersion: true, requiredVersion: 'auto' },
      },
    }),
  ],
};
