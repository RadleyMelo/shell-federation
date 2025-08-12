import { EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MfeEvent, MfeInputs } from './mfe-inputs.model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, JsonPipe],
  template: `
    <router-outlet></router-outlet>

 {{inputs?.usuarioId}}
  `,
})
export class AppComponent implements OnInit {


  @Input() set inputs(v: MfeInputs) {console.log('Inputs set:', v); }
  @Output() evento = new EventEmitter<MfeEvent>();

  constructor(private _router: Router) {}

  ngOnInit(): void {
    this._router.initialNavigation();

    this.evento.emit({  type: 'init',  payload: 'Component initialized' });

    setTimeout(() => {
      this.evento.emit({ type: 'data', payload: { info: 'Some data from MFE-A' } });
    }, 3000);

        setTimeout(() => {
      this.evento.emit({ type: 'data', payload: { info: 'Some data from MFE-B' } });
    }, 5000);

            setTimeout(() => {
      this.evento.emit({ type: 'data', payload: { info: 'Some data from MFE-C' } });
    }, 10000);

                setTimeout(() => {
      this.evento.emit({ type: 'data', payload: { info: 'Some data from MFE-D' } });
    }, 15000);
                    setTimeout(() => {
      this.evento.emit({ type: 'data', payload: { info: 'Some data from MFE-E' } });
    }, 20000);
  }
}
