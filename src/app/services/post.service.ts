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
import { ConstantsService } from './constants.service';

@Injectable()
export class PostService {
  private _posts: Post[] = [];
  public postsUpdated = new Subject<Post[]>();
  private readonly _SERVER_PATH = ConstantsService.SERVER_REST_PATH + 'posts/';

  constructor(private _httpClient: HttpClient,
              private _utilities: UtilitiesService,
              private _login: UtenteAndLoginService) {
  }


  // import cv data from the server
  public loadPosts(): Observable<Post[]> {
    return this._httpClient.get<any[]>(this._SERVER_PATH).pipe(
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
      this._SERVER_PATH + id
    ).pipe(
      map(pDTO => {
        return this._utilities.postDTOToPost(pDTO);
      })
    )
  }

  increaseViewCount(id: number): Observable<boolean> {
    return this._httpClient.put<boolean>(this._SERVER_PATH + id,
      "",
      {
        headers: {
          'Content-Type': 'application/json',
          'jwt': this._login.jwt as string
        }
      });
  }

  insertPost(post: Post): Observable<boolean> {

    const req = this._httpClient.post<boolean>(this._SERVER_PATH,
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
