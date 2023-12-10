import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarComponent } from './listar/listar.component';
import { PrincipalComponent } from './principal/principal.component';

const routes: Routes = [
  { path: 'listar', component: ListarComponent },
  { path: 'principal', component: PrincipalComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
