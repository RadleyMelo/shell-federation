// const { withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
// module.exports = withModuleFederationPlugin({
//   name: 'mfea',
//   exposes: { './Mount': './src/bootstrap-mf.ts', './MountVcr': './src/bootstrap-mf-vcr.ts' },
//   shared: {
//     '@angular/core': { singleton: true, strictVersion: true, requiredVersion: '16.1.0' },
//     '@angular/common': { singleton: true, strictVersion: true, requiredVersion: '16.1.0' },
//     '@angular/router': { singleton: true, strictVersion: true, requiredVersion: '16.1.0' },
//     'rxjs': { singleton: true, strictVersion: true },
//   },
// });

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require('./package.json').dependencies;

const rv = (name) => ({ singleton: true, strictVersion: true, requiredVersion: deps[name] });

module.exports = {
  output: {
    publicPath: "auto",
  },
  optimization: {
    runtimeChunk: false,
  },
  experiments: {
    outputModule: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "mfe1",
      exposes: { './Mount': './src/bootstrap-mf.ts', './MountVcr': './src/bootstrap-mf-vcr.ts' },
      library: { type: "module" },
      filename: "remoteEntry.js",
      shared: {
        '@angular/core': rv('@angular/core'),
        '@angular/common': rv('@angular/common'),
        '@angular/router': rv('@angular/router'),
        '@angular/platform-browser': rv('@angular/platform-browser'),
        '@angular/forms': rv('@angular/forms'),
        '@angular/common/http': rv('@angular/common/http'),
        '@angular/platform-browser/animations': rv('@angular/platform-browser/animations'),
        '@angular/animations': rv('@angular/animations'),
        rxjs: rv('rxjs'),
        'zone.js': { singleton: true, strictVersion: true, requiredVersion: deps['zone.js'], eager: true },
        tslib: rv('tslib'),
      }
    }),
  ],
};
