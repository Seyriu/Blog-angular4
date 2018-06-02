import { Post } from './post.model';
import { Utente } from './utente.model';

export class Commento {
  constructor(
    public id: number,
    public testo: string,
    public dataInserimentoAsString: string,
    public dataRispostaAsString: string,
    public risposta: string,
    public visibile: boolean,
    public post: Post,
    public utente: Utente
  ) {}
}
