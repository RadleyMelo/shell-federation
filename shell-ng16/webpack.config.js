const { withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
module.exports = withModuleFederationPlugin({
  shared: {
    '@angular/core': { singleton: true, strictVersion: true, requiredVersion: '16.1.0' },
    '@angular/common': { singleton: true, strictVersion: true, requiredVersion: '16.1.0' },
    '@angular/router': { singleton: true, strictVersion: true, requiredVersion: '16.1.0' },
    'rxjs': { singleton: true, strictVersion: true },
    'zone.js': { singleton: true, strictVersion: true, requiredVersion: '0.13.0', eager: true },
  },
});