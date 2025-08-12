import { ViewContainerRef } from "@angular/core";
import { MfeEvent, MfeInputs } from "./app/mfe-inputs.model";
import { createApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { remoteConfig } from "src/remote.config";

export async function mountInVcr(vcr: ViewContainerRef, initial?: MfeInputs, onEvent?: (e: MfeEvent) => void) {
  const appRef = await createApplication(remoteConfig);
  const compRef = vcr.createComponent(AppComponent, { environmentInjector: appRef.injector });
  if (initial) compRef.setInput?.('inputs', initial);
  const sub = compRef.instance.evento.subscribe(ev => onEvent?.(ev));
  return {
    updateInputs(next: MfeInputs) { compRef.setInput?.('inputs', { ...next }); },
    destroy() { sub.unsubscribe(); compRef.destroy(); appRef.destroy(); }
  };
}