export class Contato {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    favorito: boolean;

    constructor(id: string, nome: string, email: string, telefone: string, favorito: boolean) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.favorito = favorito;
    }
}