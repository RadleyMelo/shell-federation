// import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { HashLocationStrategy, LocationStrategy } from '@angular/common';
// import { provideHttpClient } from '@angular/common/http';
// import { routes } from './app/app-routing.module';

// export const remoteConfig: ApplicationConfig = {
//   providers: [
//     provideHttpClient(),
//     provideRouter(routes),
//     // Isola o roteador do MFE no hash, evitando conflito com o shell:
//     { provide: LocationStrategy, useClass: HashLocationStrategy },
//   ],
// };

// remote/src/app/remote.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { remoteRoutes } from './app/app-routing.module';

export const remoteConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(remoteRoutes),
    { provide: LocationStrategy, useClass: HashLocationStrategy }, // <-- isolamento
  ],
};
