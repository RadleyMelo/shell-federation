import { Routes } from '@angular/router';
import { Componente1 } from './componente1/componente1.component';
import { Componente2 } from './componente2/componente2.component';

export const remoteRoutes: Routes = [
  { path: '', component: Componente1 },
  { path: 'detail/:id', component: Componente2 },
    { path: '**', redirectTo: '' }, 
];