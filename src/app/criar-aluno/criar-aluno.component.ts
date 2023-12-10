import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AlunoService } from '../aluno.service';

@Component({
  selector: 'app-criar-aluno',
  templateUrl: './criar-aluno.component.html',
  styleUrls: ['./criar-aluno.component.css']
})
export class CriarAlunoComponent {
[x: string]: any;
    FormAluno!: FormGroup;
    cadastroSucesso = false;
  
  
      constructor(
      private formBuilder: FormBuilder,
      private alunoService: AlunoService, private router: Router, private snackBar: MatSnackBar
    ) { }
  
    ngOnInit(): void {
      this.inicializarFormulario();
    }
  
    inicializarFormulario(): void {3
      this.FormAluno = this.formBuilder.group({
        nome: ['', Validators.required],
        matricula: ['', Validators.required],
        nascimento: ['', Validators.required],
        dataCadastro: [{ value: '', disabled: true }],
      });
    }
  
    salvarAluno() {
      if (this.FormAluno.valid) {
        const alunoData = this.FormAluno.value;
  
        const dataNascimentoFormatada = this.formatarData(alunoData.nascimento);
        alunoData.nascimento = dataNascimentoFormatada;
  
        this.alunoService.criarAluno(alunoData).subscribe(
          (response: any) => {
            console.log('Aluno salvo com sucesso:', response);
            this.cadastroSucesso = true;
          },
          (error: any) => {
            console.error('Erro ao salvar aluno:', error);
          }
        );
      }
    }
  
    formatarData(data: string): string {
      const partes = data.split('/');
      return `${partes[2]}-${partes[1]}-${partes[0]}`;
    }
  
    fecharMensagem() {
      this.cadastroSucesso = false;
    }
  
    exibirDialogo(): void {
      const mensagem = 'Aluno cadastrado com sucesso!';
      this.snackBar.open(mensagem, 'OK', {
        duration: 2000,
      });
  
      this.snackBar._openedSnackBarRef?.onAction().subscribe(() => {
        this.router.navigate(['list']);
      });
    }
  }


