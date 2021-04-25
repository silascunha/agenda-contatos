import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contato } from 'src/app/shared/model/contato.model';
import { ContatoService } from 'src/app/shared/service/contato.service';
import { ConfirmacaoDialogComponent } from '../dialogs/confirmacao-dialog/confirmacao-dialog.component';
import { ContatoDialogComponent } from '../dialogs/contato-dialog/contato-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  contatos: Contato[];
  favoritos: Contato[];

  //boolean para o ngIf da lista de contatos na home
  contatosEstaVazio: boolean = false;
  favoritosEstaVazio: boolean = false;

  constructor(public contatoDialog: MatDialog,
      public confirmacaoDialog : MatDialog,
      public contatoService : ContatoService,
      public _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.atualizarListaContatos();
  }

  /**
   * Abre o dialog com o form para criar um novo contato
   */
  abrirContatoDialog(): void {
    const refDialog = this.contatoDialog.open(ContatoDialogComponent, {
      width: '350px'
    });
    refDialog.afterClosed().subscribe(resultado => {
      //verificando se existe um resultado antes de inserir
      if(resultado) {
        this.contatoService.insert(resultado, this.exibirErro);
        this.atualizarListaContatos();
      }
    })
  }

  atualizarListaContatos() {
    this.contatos = this.contatoService.getContatos();
    this.favoritos = this.contatoService.getContatosFavoritos();

    this.contatosEstaVazio = (this.contatos.length > 0) ? false : true;
    this.favoritosEstaVazio = (this.favoritos.length > 0) ? false : true;
  }

  /**
   * Método de evento chamado pelo card do contato a ser excluido
   * @param id O id do contato a ser excluído
   */
  contatoExcluido(id: string) {
    console.log('Voce quer excluir o produto do id: ' + id);
    let contato = this.contatoService.getContatoById(id);

    const refDialog = this.confirmacaoDialog.open(ConfirmacaoDialogComponent, {
      width: '350px',
      data: contato
    });
    refDialog.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.contatoService.excluir(id);
        this.atualizarListaContatos();
      }
    })
  }

  /**
   * Evento chamado ao clicar no botão de editar de um card de contato
   * @param contato Dados atualizados do contato
   */
  atualizarContato(contato: Contato) {
    const refDialog = this.contatoDialog.open(ContatoDialogComponent, {
      width: '350px',
      data: contato
    });
    refDialog.afterClosed().subscribe(resultado => {
      //verificando se existe um resultado antes de atualizar
      if (resultado) {
        this.contatoService.update(resultado, this.exibirErro);
        this.atualizarListaContatos();
      }
      
    })
  }

  /**
   * Método chamado no keyup do input de pesquisa
   * @param valor Valor do input da pesquisa
   */
  pesquisarContato(valor: string) {
    this.contatos = this.contatoService.pesquisar(valor);
    this.favoritos = this.contatos.filter(x => x.favorito);
  }

  //função de callback chamada nos metodos de update e insert do contato.service
  exibirErro = (erros: any[]) => {
    let mensagem = 'Não foi possível salvar pois há um outro contato com esses dados: ';

    erros.forEach((valor, index) => {
      if ((erros.length - 1) == index) {
        mensagem += valor;
      }
      else {
        mensagem += valor + ', ';
      }
    });

    this._snackBar.open(mensagem, 'FECHAR', {
      duration: 5000
    });
  }
}
