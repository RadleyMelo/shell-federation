import { ComponentRef, ViewContainerRef, EnvironmentInjector } from '@angular/core';
import { createApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { MfeEvent, MfeInputs } from './app/mfe-inputs.model';
import { remoteConfig } from 'src/remote.config';

export async function mountInVcr(
  vcr: ViewContainerRef,
  initial?: MfeInputs,
  onEvent?: (e: MfeEvent) => void
) {
  const app = await createApplication(remoteConfig);
  const compRef: ComponentRef<AppComponent> = vcr.createComponent(AppComponent, {
    environmentInjector: app.injector as EnvironmentInjector,
  });
  if (initial) compRef.setInput?.('inputs', initial);
  const sub = compRef.instance.evento.subscribe(ev => onEvent?.(ev));
  return {
    updateInputs(next: MfeInputs) { compRef.setInput?.('inputs', { ...next }); },
    destroy() { sub.unsubscribe(); compRef.destroy(); app.destroy(); },
  };
}