import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listaAlunos } from './listar/listar.component';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private apiUrl = 'http://localhost:8080/api/aluno';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  listarAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.apiUrl}/listar`);
  }

  criarAluno(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(`${this.apiUrl}/incluir`, aluno, this.getHttpOptions());
  }

  editarAluno(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/edit/${id}`, this.httpOptions);
  }

  salvarEdicao(aluno: listaAlunos): Observable<any> {
    const url = `${this.apiUrl}/editarAluno/${aluno.id}`; // Substitua pela URL correta de edição
    return this.http.put(url, aluno);
  }

  atualizarAluno(alunoId: number, aluno: Aluno): Observable<Aluno> {
    return this.http.put<Aluno>(`${this.apiUrl}/editar/${alunoId}`, aluno);
  }

  removerAluno(id: number): Observable<void> {
    const url = `${this.apiUrl}/remover`;

    return this.http.post<void>(url, { id });
  }

  obterAlunoPorId(id: number): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.apiUrl}/get/${id}`);
  }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }
}

export interface Aluno {
  id: number;
  nome: string;
  matricula: string;
  data_hora_cadastro: string;
  nascimento: string;
}
