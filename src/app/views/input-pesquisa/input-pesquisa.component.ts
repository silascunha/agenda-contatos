import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

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

  @ViewChild('pesquisa')
  inputPesquisa: ElementRef;

  constructor() { }

  toggle() {
    this.isOpen = !this.isOpen;

    if(!this.isOpen) {
      this.valorInput = '';
      this.teclaPressionada(null);
    }
    else {
      //foca no input caso a ação seja para abrir
      this.inputPesquisa.nativeElement.focus();
    }
  }

  //chamado no onkeyup do input
  teclaPressionada(event) {
    this.eventoDePesquisa.emit(this.valorInput);
  }
}
