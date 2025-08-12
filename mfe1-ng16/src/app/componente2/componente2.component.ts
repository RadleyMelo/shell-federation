import { Component, EventEmitter, Input, OnInit, Output, VERSION } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

// The webpack configuration file at /component-standalone-ng16/mfe1-ng16/webpack.config.js
// exposes a webpack module which contains this Angular standalone component
@Component({
  selector: 'app-component2',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './componente2.component.html',
})
export class Componente2 {

  
      constructor(private _router: Router) {}
  
  
      navegarParaDetalhe() {
          this._router.navigate(['/']);
      }
}
