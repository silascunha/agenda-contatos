import { Injectable } from '@angular/core';
import { Contato } from '../model/contato.model';

/**
 * Service com os métodos para o CRUD de contatos, utilizando o Local Storage para testes
 * sem um back-end
 */
@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  contatos: Contato[];
  favoritos: Contato[];

  constructor() {
    this.iniciarDados();
  }

  private iniciarDados(): void {
    this.contatos = [];
    this.favoritos = [];

    let dados = localStorage.getItem('contatos');

    if (dados == null) {
      localStorage.setItem('contatos', JSON.stringify(this.contatos));
    }
  }

  public getContatos(): Contato[] {
    this.contatos = JSON.parse(localStorage.getItem('contatos'));

    return this.contatos;
  }

  public getContatosFavoritos(): Contato[] {
    this.favoritos = this.contatos.filter(x => x.favorito);

    return this.favoritos;
  }

  public getContatoById(id: string) {
    let contatos: Contato[] = this.getContatos();
    return contatos.find(x => x.id == id);
  }

  public insert(contato: Contato, callbackErro): void {
    if (this.haCamposRepetidos(contato, this.contatos, callbackErro)) {
      return;
    }

    this.gerarId(contato);
    this.contatos.push(contato);
    let objJson = JSON.stringify(this.contatos);

    localStorage.setItem('contatos', objJson);
  }

  public update(contato: Contato, callbackErro) {

    if (this.haCamposRepetidos(contato, this.contatos, callbackErro)) {
      return;
    }

    let index = this.contatos.findIndex(x => x.id == contato.id);
    this.contatos.splice(index, 1, contato);

    let objJson = JSON.stringify(this.contatos);
    localStorage.setItem('contatos', objJson);
  }

  public excluir(id: string): boolean {
    let index = this.contatos.findIndex(x => x.id == id);

    if (index == -1) {
      return false;
    }
    
    this.contatos.splice(index, 1);

    let objJson = JSON.stringify(this.contatos);
    localStorage.setItem('contatos', objJson);
    
    return true;
  }

  /**
   * Verifica se há algum contato com um ou mais campos iguais ao que será inserido, caso possua
   * é chamada a função de callback passando quais campos já existem em outro contato como parametro
   * @param contato Contato a ser inserido/atualizado
   * @param lista Lista de contatos atuais
   * @param callbackErro Função de callback a ser executada caso haja um outro contato com os mesmos campos
   * @returns true caso tenha um outro contato com algum campo repetido
   */
  private haCamposRepetidos(contato: Contato, lista: Contato[], callbackErro): boolean {
    let contatoTemp : Contato;
    let erros : any[] = [];
    
    lista.some(element => {
      let nomeRepetido = element.nome == contato.nome;
      let emailRepetido = element.email == contato.email;
      let telefoneRepetido = element.telefone == contato.telefone;

      //verificação se o elemento atual da lista no loop é o mesmo através do ID em caso de update,
      //caso seja as outras verificações são puladas
      if(contato.id) {
        if(contato.id == element.id) {
          return false;
        }
      }

      if(nomeRepetido) {
        erros.push(contato.nome);
      }
      if(emailRepetido) {
        erros.push(contato.email);
      }
      if(telefoneRepetido) {
        erros.push(contato.telefone);
      }

      if(erros.length > 0) {
        contatoTemp = element;
        return true;
      }
      return false;
    });

    if(contatoTemp) {
      callbackErro(erros);

      return true;
    }
    return false;
  }

  pesquisar(valor: string): Contato[] {
    let valorPesquisa = valor.toLowerCase();

    return this.contatos.filter(x => {
      let nome = x.nome.toLowerCase();
      let email = x.email.toLowerCase();

      return nome.includes(valorPesquisa) || 
              email.includes(valorPesquisa) ||
              x.telefone.includes(valorPesquisa);
    });
  }

  //geração de ID unico para cada contato apenas por causa do Local Storage
  private gerarId(contato: Contato) {
    contato.id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
