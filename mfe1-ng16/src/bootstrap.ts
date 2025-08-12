// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { AppModule } from './app/app.module';

// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .catch((err) => console.error(err));
// main.ts (remote)
import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app/app.component';
import { remoteConfig } from './remote.config';

export async function defineRemoteElement(tagName = 'mfe-x') {
  // cria a aplicação do MFE com seus providers (app.config)
  const app = await createApplication(remoteConfig);

  // registra o custom element (sem Shadow DOM por padrão)
  if (!customElements.get(tagName)) {
    const el = createCustomElement(AppComponent, { injector: app.injector });
    customElements.define(tagName, el);
  }
}