import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

/**
 * Componente de input de pesquisa animado da navbar
 */

@Component({
  selector: 'app-input-pesquisa',
  templateUrl: './input-pesquisa.component.html',
  styleUrls: ['./input-pesquisa.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        width: '*'
      })),
  
      state('closed', style({
        width: '40px',
        opacity: 0
      })),
  
      transition('open => closed', [
        animate('0.4s')
      ]),
  
      transition('closed => open', [
        animate('0.4s')
      ])
    ]),
  ]
})
export class InputPesquisaComponent {

  isOpen: boolean = false;
  valorInput: string;

  @Output()
  eventoDePesquisa = new EventEmitter();

  constructor() { }

  toggle() {
    if(this.isOpen) {
      this.valorInput = '';
      this.inputPesquisa(null);
    }
    this.isOpen = !this.isOpen;
  }

  inputPesquisa(event) {
    this.eventoDePesquisa.emit(this.valorInput);
  }
}
