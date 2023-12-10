import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlunoService } from '../aluno.service';


export interface listaAlunos {
  id: number;
  nome: string;
  matricula: string;
  data_hora_cadastro: string;
  nascimento: string;
}


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
})

export class ListarComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'data_hora_cadastro', 'matricula', 'nascimento', 'actions'];
  dataSource: MatTableDataSource<listaAlunos> = new MatTableDataSource<listaAlunos>();


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private alunoService: AlunoService,
    public dialog: MatDialog) { }

  ngOnInit() {
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
    const alunoId = aluno.id as number;
    this.alunoService.editarAluno(alunoId).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((a) => a.id !== alunoId);

      this.ListarAlunos();
    });
  }

  salvarEdicao(): void {
    if (this.alunoEditando) {
      this.alunoService.salvarEdicao(this.alunoEditando).subscribe(() => {
        this.alunoEditando = null;
        this.ListarAlunos();
      });
    }
  }
  
  cancelarEdicao(): void {
    this.alunoEditando = null;
  }

  removerAluno(aluno: listaAlunos): void {
    const alunoId = aluno.id as number;
    this.alunoService.removerAluno(alunoId).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((a) => a.id !== alunoId);
  
      this.ListarAlunos();
    });
  };
  }



