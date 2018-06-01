import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { Commento } from '../models/commento.model';

@Injectable()
export class HttpService {
  private _posts: any[] = null;

  constructor(private _httpClient: HttpClient) { }



  // import cv data from the server
  public loadPosts(): Observable<any[]> {
    return this._httpClient.get<any[]>(
      'http://localhost:8080/blog/rest/posts'
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
    return this._httpClient.post<boolean>('http://localhost:8080/blog/rest/comments',
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
