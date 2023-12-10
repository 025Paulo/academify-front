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

  getAluno(id: number): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.apiUrl}/get/${id}`);
  }

  incluirAluno(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(`${this.apiUrl}/incluir`, aluno, this.getHttpOptions());
  }

  editarAluno(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/edit/${id}`, this.httpOptions);
  }

  salvarEdicao(aluno: listaAlunos): Observable<any> {
    const url = `${this.apiUrl}/editarAluno/${aluno.id}`; // Substitua pela URL correta de edição
    return this.http.put(url, aluno);
  }

  removerAluno(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remover/${id}`, this.httpOptions);
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
