import { Post } from './post.model';

export class Commento {
  constructor(
    public id: number,
    public testo: string,
    public dataInserimentoAsString: string,
    public dataRispostAsString: string,
    public risposta: string,
    public visibile: boolean,
    public post: Post
  ) {}
}
