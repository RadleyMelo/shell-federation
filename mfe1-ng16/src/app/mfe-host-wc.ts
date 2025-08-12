import { Component, ElementRef, ViewChild, ViewContainerRef } from "@angular/core";
import { MfeInputs } from "./mfe-inputs.model";

@Component({ standalone: true, template: '<div #root></div>' })
class WcWrapperComponent {
  @ViewChild('root', { static: true, read: ElementRef }) root!: ElementRef<HTMLElement>;
}

export function mountMfeAasWC(vcr: ViewContainerRef, inputs: MfeInputs, onEvent: (e: CustomEvent) => void) {
  const wrapperRef = vcr.createComponent(WcWrapperComponent);
  const el = document.createElement('mfe-a') as any;
  el.inputs = inputs;
  const handler = (evt: Event) => onEvent(evt as CustomEvent);
  el.addEventListener('evento', handler);
  wrapperRef.instance.root.nativeElement.appendChild(el);
  return {
    updateInputs(next: MfeInputs) { el.inputs = { ...next }; },
    destroy() { el.removeEventListener('evento', handler); wrapperRef.destroy(); }
  };
}