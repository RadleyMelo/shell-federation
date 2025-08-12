import { Component, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';

@Component({ standalone: true, template: '<div #root></div>' })
class WcWrapperComponent {
  @ViewChild('root', { static: true, read: ElementRef }) root!: ElementRef<HTMLElement>;
}

export function mountMfeAasWC_VCR(
  tagMfe: string,
  vcr: ViewContainerRef,
  inputs: any,
  onEvent: (e: CustomEvent) => void
) {
  const wrapperRef = vcr.createComponent(WcWrapperComponent);
  const el = document.createElement(tagMfe) as any; // definido em main.ce.ts
  el.inputs = inputs;
  const handler = (evt: Event) => onEvent(evt as CustomEvent);
  el.addEventListener('evento', handler as EventListener);
  wrapperRef.instance.root.nativeElement.appendChild(el);

  return {
    updateInputs(next: any) { el.inputs = { ...next }; },
    destroy() { el.removeEventListener('evento', handler as EventListener); wrapperRef.destroy(); },
  };
}