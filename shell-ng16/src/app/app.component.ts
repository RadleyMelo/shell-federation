// import {
//   LoadRemoteModuleOptions,
//   loadRemoteModule,
// } from '@angular-architects/module-federation';
// import { DOCUMENT } from '@angular/common';
// import {
//   Component,
//   ComponentRef,
//   ElementRef,
//   EventEmitter,
//   Inject,
//   VERSION,
//   ViewChild,
//   ViewContainerRef,
// } from '@angular/core';

import { AfterViewInit, Component, OnDestroy, ViewChild, ViewContainerRef } from "@angular/core";
import { mountMfeAasWC_VCR } from "./mfe-host-wc.vcr";
import { mountMfeAasMF } from "./mf-loader";

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
// })
// export class AppComponent {
//   @ViewChild('mfe', { read: ViewContainerRef, static: true })
//   private readonly _viewContainerRef?: ViewContainerRef;

//     @ViewChild('mount', { read: ElementRef, static: true }) private mountEl!: ElementRef<HTMLElement>;
//   // Se quiser “usar o VCR”, você pode injetá-lo também como âncora do componente:

//   public readonly version: string = VERSION.full;

//   public messageFromComponent: string = "";

//   // The correct way to interact with the document object in Angular is to use the DOCUMENT
//   // injection token https://angular.io/api/common/DOCUMENT
//   public constructor(@Inject(DOCUMENT) private readonly _document: Document) { }

//     private handle?: any;

//   public reset(): void {
//     this._document.location.href = "/";
//   }

//   public RemoveComponent(): void {
//     this._viewContainerRef?.clear();
//   }

//   public async loadMyStandalone(): Promise<void> {
//     if (!this._viewContainerRef) {
//       return;
//     }

//     // load the component
//     this._viewContainerRef.clear();
//     debugger
//     const mod = await loadRemoteModule({
//       type: 'module',
//       remoteEntry: 'http://localhost:4201/remoteEntry.js',
//       exposedModule: './mount',
//     });

//     this.handle = await mod.mount(this.mountEl.nativeElement, {
//       userId: 'u-123',
//       initialTab: 'list',
//       onEvent: (evt: any) => {
//         console.log('MFE -> Shell:', evt);
//         if (evt.type === 'openedDetail') {
//           // exemplo: reagir a evento
//         }
//       }
//     });

//     setTimeout(() => {
//       this.handle?.update({ userId: 'u-456' });
//       console.log('MFE atualizado');
//     }, 5000);

//     const loadRemoteWebpackModuleOptions: LoadRemoteModuleOptions = {
//       type: 'module',
//       exposedModule: './my-standalone-component',
//       remoteEntry: 'http://localhost:4201/remoteEntry.js',
//     };
//     const webpackModule: any = await loadRemoteModule(loadRemoteWebpackModuleOptions);
//     const componentRef: ComponentRef<any> = this._viewContainerRef.createComponent(webpackModule.MyStandaloneComponent);

//     // set component input and subscribe to component outputs
//     // componentRef.instance.inputText = "Hello from the shell!"; // this also works but for inputs the setInput method shown in the line below is the preferred way
//     componentRef.setInput("inputText", "Hello from the shell!");
//     (componentRef.instance.loadedEvent as EventEmitter<string>).subscribe(x=>{
//       this.onComponentLoaded(x);
//     });
//     (componentRef.instance.destroyedEvent as EventEmitter<string>).subscribe(x=>{
//       this.onComponentDestroyed(x);
//     });
//   }

//     async montar() {
//     this.handle?.destroy();
//     this.vc.clear();
//     const inputs: anu = { usuarioId: '123', tema: 'light' };

//     if (this.mode === 'wc') {
//       this.handle = mountMfeAasWC_VCR(this.vc, inputs, (e) => console.log('evento WC', e));
//     } else {
//       this.handle = await mountMfeAasMF(this.vc, inputs, (e: MfeEvent) => console.log('evento MF', e));
//     }
//   }


//   private onComponentLoaded(message: string) {
//     this.messageFromComponent = message;
//   }

//   private onComponentDestroyed(message: string) {
//     this.messageFromComponent = message;
//   }
// }


@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="toolbar">
      <button (click)="mode='wc'; montar()">WC</button>
      <button (click)="mode='mf'; montar()">MF</button>
      <button (click)="atualizar()">Atualizar inputs</button>
    </div>
    <ng-container #vc></ng-container>
  `,
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('vc', { read: ViewContainerRef, static: true }) vc!: ViewContainerRef;
  mode: 'wc' | 'mf' = 'wc';
  handle?: { updateInputs(i: any): void; destroy(): void };

  async ngAfterViewInit() { await this.montar(); }

  async montar() {
    debugger;
    this.handle?.destroy();
    this.vc.clear();
    const inputs: any = { usuarioId: '123', tema: 'light' };

    if (this.mode === 'wc') {
      this.handle = mountMfeAasWC_VCR("mfea",this.vc, inputs, (e) => console.log('evento WC', e));
    } else {
      this.handle = await mountMfeAasMF(this.vc, inputs, (e: any) => console.log('evento MF', e));
    }
  }

  atualizar() { this.handle?.updateInputs({ usuarioId: Math.random().toString(36).slice(2) }); }
  ngOnDestroy() { this.handle?.destroy(); }
}