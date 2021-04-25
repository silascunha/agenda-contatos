import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Contato } from 'src/app/shared/model/contato.model';

@Component({
  selector: 'app-confirmacao-dialog',
  templateUrl: './confirmacao-dialog.component.html',
  styleUrls: ['./confirmacao-dialog.component.css']
})
export class ConfirmacaoDialogComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmacaoDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Contato) {
  }

  cancelar(): void {
    this.dialogRef.close();
  }

}
