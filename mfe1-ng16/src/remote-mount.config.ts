// remote/src/remote.mount.ts
import { ApplicationRef, createComponent, ComponentRef, signal } from '@angular/core';
import { remoteConfig } from './remote.config';
import { createApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { Router } from '@angular/router';

let appRef: ApplicationRef | null = null;
let compRef: ComponentRef<AppComponent> | null = null;

export async function mount(host: Element, initialProps?: any) {
  
  // cria uma **nova aplicação Angular** só para o MFE
  appRef = await createApplication(remoteConfig);

  // monta o componente raiz do MFE dentro do host recebido
  compRef = createComponent(AppComponent, {
    environmentInjector: appRef.injector,
    hostElement: host as HTMLElement,
  });

  appRef.attachView(compRef.hostView);

    // Aplique inputs iniciais
  for (const [key, value] of Object.entries(initialProps)) {
    // setInput dispara OnChanges e marca o componente para verificação
    compRef.setInput(key, value as any);
  }


  compRef.changeDetectorRef.detectChanges();

  return {
    update(next: Partial<any>) {
      for (const [key, value] of Object.entries(next)) {
        compRef!.setInput(key, value as any);
      }
      // opcional se seu componente for OnPush e você quiser forçar
      compRef!.changeDetectorRef.detectChanges();
    },
    destroy: () => unmount(),
  };
}

export function unmount() {
  try {
    compRef?.destroy();
  } finally {
    appRef?.destroy();
    compRef = null;
    appRef = null;
  }
}
