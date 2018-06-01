import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { Commento } from '../models/commento.model';
import { map } from 'rxjs/internal/operators';
import { post } from 'selenium-webdriver/http';

@Injectable()
export class HttpService {
  private _posts: any[] = null;

  constructor(private _httpClient: HttpClient) {
  }


  // import cv data from the server
  public loadPosts(): Observable<Post[]> {
    return this._httpClient.get<any[]>(
      'http://localhost:8080/blog/rest/posts'
    )
      .pipe(
        map(extPosts => {
          var posts: Post[] = [];
          extPosts.forEach((extPost: any) => {
            var post: Post = new Post(
              extPost.id,
              extPost.titolo,
              extPost.descrizione,
              extPost.dataPostAsString,
              extPost.visibile,
              extPost.visite,
              extPost.categoria,
              extPost.utente,
              extPost.tags
            );
            posts.push(post);
          });
          return posts;
        })
      )
  }

  public loadTags(): Observable<any[]> {
    return this._httpClient.get<any[]>(
      'http://localhost:8080/blog/rest/tags'
    )
  }

  public loadCategorie(): Observable<any[]> {
    return this._httpClient.get<any[]>(
      'http://localhost:8080/blog/rest/categorie'
    )
  }

  public loadCategoria(id: number): Observable<any[]> {
    return this._httpClient.get<any[]>(
      'http://localhost:8080/blog/rest/categorie/' + id
    )
  }

  public loadTag(id: number): Observable<any[]> {
    return this._httpClient.get<any[]>(
      'http://localhost:8080/blog/rest/tags/' + id
    )
  }

  public loadPost(id: number): Observable<any> {
    return this._httpClient.get<any[]>(
      'http://localhost:8080/blog/rest/posts/' + id
    )
  }

  newPost(post: Post): Observable<boolean> {

    const req = this._httpClient.post<boolean>('http://localhost:8080/blog/rest/posts',
      JSON.stringify(post),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    return req;
  }

  newComment(commento: Commento): Observable<boolean> {
    console.log(JSON.stringify(commento));
    return this._httpClient.post<boolean>('http://localhost:8080/blog/rest/commenti',
      JSON.stringify(commento),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  }

  public getPosts() {
    return this._posts;
  }

  public setPosts(posts: any[]) {
    this._posts = posts;
  }

}
