import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contato } from 'src/app/shared/model/contato.model';
import { ContatoService } from 'src/app/shared/service/contato.service';
import { ContatoDialogComponent } from '../dialogs/contato-dialog/contato-dialog.component';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.css']
})
export class ContatosComponent implements OnInit {

  @Input() contato: Contato;
  @Output() eventoDeExclusao = new EventEmitter();
  @Output() eventoDeAtualizacao = new EventEmitter();
  @Output() estadoAlterado = new EventEmitter();
  
  constructor(public contatoService: ContatoService) { }

  ngOnInit(): void {
  }

  editar() {
    this.eventoDeAtualizacao.emit(this.contato);
    this.contato = this.contatoService.getContatoById(this.contato.id);
  }

  favoritar() {
    this.contato.favorito = !this.contato.favorito;
    this.contatoService.update(this.contato, null);
    this.estadoAlterado.emit();
  }

}
