import { ViewContainerRef } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';

export async function mountMfeAasMF(
  vcr: ViewContainerRef,
  inputs: any,
  onEvent: (e: any) => void
) {
  const remote = await loadRemoteModule({
    type: 'module',
    remoteEntry: 'http://127.0.0.1:5500/mfe1-ng16/dist/mfe1-ng16/remoteEntry.js',
    exposedModule: './MountVcr',
  });
  return remote.mountInVcr(vcr, inputs, onEvent);
}