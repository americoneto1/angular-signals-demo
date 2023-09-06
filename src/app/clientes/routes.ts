import { Route } from '@angular/router';

import { CadastroComponent } from './cadastro.component';
import { ListComponent } from './list.component';

export const CLIENTES_ROUTES: Route[] = [
  { path: '', component: ListComponent },
  { path: 'cadastro/:id', component: CadastroComponent },
  { path: 'cadastro', component: CadastroComponent },
]
