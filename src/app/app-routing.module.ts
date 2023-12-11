import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriarAlunoComponent } from './criar-aluno/criar-aluno.component';
import { EditarAlunoComponent } from './editar-aluno/editar-aluno.component';
import { ListarComponent } from './listar/listar.component';
import { PrincipalComponent } from './principal/principal.component';

const routes: Routes = [
  { path: 'listar', component: ListarComponent },
  { path: 'principal', component: PrincipalComponent },
  { path: 'criaraluno', component: CriarAlunoComponent },
  { path: 'editaraluno', component: EditarAlunoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
