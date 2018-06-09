import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Post } from '../models/post.model';
import { Commento } from '../models/commento.model';
import { map } from 'rxjs/internal/operators';
import { post } from 'selenium-webdriver/http';
import { UtilitiesService } from './utilities.service';
import { Tag } from '../models/tag.model';
import { Categoria } from '../models/categoria.model';
import { UtenteAndLoginService } from './utente-and-login.service';

@Injectable()
export class PostService {
  private _posts: Post[] = [];
  public postsUpdated = new Subject<Post[]>();

  constructor(private _httpClient: HttpClient,
              private _utilities: UtilitiesService,
              private _login: UtenteAndLoginService) {
  }


  // import cv data from the server
  public loadPosts(): Observable<Post[]> {
    return this._httpClient.get<any[]>(
      'http://localhost:8080/blog/rest/posts'
    ).pipe(
        map(postsDTO => {
          var posts: Post[] = [];
          postsDTO.forEach((pDTO: any) => {
            posts.push(this._utilities.postDTOToPost(pDTO));
          });
          return posts;
        })
      )
  }

  public loadPost(id: number): Observable<Post> {
    return this._httpClient.get<any[]>(
      'http://localhost:8080/blog/rest/posts/' + id
    ).pipe(
      map(pDTO => {
        return this._utilities.postDTOToPost(pDTO);
      })
    )
  }

  increaseViewCount(id: number): Observable<boolean> {
    return this._httpClient.put<boolean>('http://localhost:8080/blog/rest/posts/view-count/' + id,
      "",
      {
        headers: {
          'Content-Type': 'application/json',
          'jwt': this._login.jwt as string
        }
      });
  }

  insertPost(post: Post): Observable<boolean> {

    const req = this._httpClient.post<boolean>('http://localhost:8080/blog/rest/posts',
      JSON.stringify(post),
      {
        headers: {
          'Content-Type': 'application/json',
          'jwt': this._login.jwt as string
        }
      });
    return req;
  }

  get posts(): Post[] {
    return this._posts;
  }

  set posts(value: Post[]) {
    this._posts = value;
    this.postsUpdated.next(this._posts);
  }
}
