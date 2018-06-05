import { Post } from './post.model';

export class Categoria {
  constructor(
    public id: number,
    public nome: string,
    public descrizione: string,
    public immagine: string,
    public posts: Post[]
  ) {}
}
