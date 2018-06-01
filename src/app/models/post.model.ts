import { Categoria } from './categoria.model';
import { Utente } from './utente.model';
import { Tag } from './tag.model';

export class Post {
  constructor(
    public id: number,
    public titolo: string,
    public descrizione: string,
    public dataPostAsString: string,
    public visibile: boolean,
    public visite: number,
    public categoria: Categoria,
    public utente: Utente,
    public tags: Tag[]
  ) {}
}
