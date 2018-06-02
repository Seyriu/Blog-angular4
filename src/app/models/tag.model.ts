import { Post } from './post.model';

export class Tag {
  constructor(
    public id: number,
    public nome: string,
    public posts: Post[],
  ) {}
}
