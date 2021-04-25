import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { Contato } from 'src/app/shared/model/contato.model';

@Component({
  selector: 'app-contato-dialog',
  templateUrl: './contato-dialog.component.html',
  styleUrls: ['./contato-dialog.component.css']
})
export class ContatoDialogComponent {

  contato : Contato;
  editando : boolean = false;

  constructor(public dialogRef: MatDialogRef<ContatoDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Contato) {
    if (this.data) {
      this.contato = data;
      this.editando = true;
    }
    else {
      this.contato = {
        id: null,
        nome: null,
        email: null,
        telefone: null,
        favorito: false
      }
    }
  }

  cancelar() : void {
    this.dialogRef.close();
  }

}
