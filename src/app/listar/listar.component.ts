import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Aluno, AlunoService } from '../aluno.service';


export interface listaAlunos {
  id: number;
  nome: string;
  matricula: string;
  data_hora_cadastro: Date | string;
  nascimento: Date | string;
  editing?: boolean;
}


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
})

export class ListarComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'nome', 'data_hora_cadastro', 'matricula', 'nascimento', 'actions'];
  dataSource: MatTableDataSource<listaAlunos> = new MatTableDataSource<listaAlunos>();


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private alunoService: AlunoService,
    private router: Router) { }

  ngAfterViewInit() {
    this.ListarAlunos();
  }

  ListarAlunos(): void {
    this.alunoService.listarAlunos().subscribe((alunos: listaAlunos[]) => {
      console.log('Dados recebidos:', alunos);
      this.dataSource.data = alunos;
      this.dataSource.paginator = this.paginator;
    }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  alunoEditando: listaAlunos | null = null;

  editarAluno(aluno: listaAlunos): void {
    aluno.editing = true; // Ativar modo de edição
    this.alunoEditando = aluno;
  }

  salvarEdicao(aluno: listaAlunos): void {
    aluno.editing = false; // Desativar modo de edição
    this.alunoEditando = null;
    // Adicione lógica para salvar as alterações no backend, se necessário
    this.ListarAlunos();
  }

  criarAluno(): void {
    this.router.navigate(['criaraluno']);
  }

  RemoverAluno(aluno: Aluno): void {
    const alunoId = aluno.id as number;
    this.alunoService.removerAluno(alunoId).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((a) => a.id !== alunoId);

      this.ListarAlunos();
    });


  }
}



