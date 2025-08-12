const { withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
module.exports = withModuleFederationPlugin({
  name: 'mfea',
  exposes: { './Mount': './src/bootstrap-mf.ts', './MountVcr': './src/bootstrap-mf-vcr.ts' },
  shared: {
    '@angular/core': { singleton: true, strictVersion: true, requiredVersion: '16.1.0' },
    '@angular/common': { singleton: true, strictVersion: true, requiredVersion: '16.1.0' },
    '@angular/router': { singleton: true, strictVersion: true, requiredVersion: '16.1.0' },
    'rxjs': { singleton: true, strictVersion: true },
    'zone.js': { singleton: true, strictVersion: true, requiredVersion: '0.13.0', import: false },
  },
});