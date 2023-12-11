import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlunoService } from '../aluno.service';

@Component({
  selector: 'app-editar-aluno',
  templateUrl: './editar-aluno.component.html',
  styleUrls: ['./editar-aluno.component.css']
})
export class EditarAlunoComponent {
  @Input() aluno: any; // Certifique-se de ajustar o tipo conforme necessário
  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private alunoService: AlunoService) {
    this.form = this.formBuilder.group({
      nome: [this.aluno.nome, Validators.required],
      matricula: [this.aluno.matricula, Validators.required],
      nascimento: [this.aluno.nascimento, Validators.required],
    });
  }

  salvarEdicao() {
    if (this.form.valid) {
      const alunoData = { ...this.aluno, ...this.form.value };
      this.alunoService.editarAluno(alunoData).subscribe(
        (response: any) => {
          console.log('Aluno editado com sucesso:', response);
          this.onSave.emit();
        },
        (error: any) => {
          console.error('Erro ao editar aluno:', error);
        }
      );
    }
  }
}