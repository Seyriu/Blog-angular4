import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { Commento } from '../models/commento.model';
import { map } from 'rxjs/internal/operators';
import { post } from 'selenium-webdriver/http';
import { UtilitiesService } from './utilities.service';
import { Tag } from '../models/tag.model';
import { Categoria } from '../models/categoria.model';
import { LoginService } from './login.service';

@Injectable()
export class HttpService {
  private _posts: any[] = null;

  constructor(private _httpClient: HttpClient,
              private _utilities: UtilitiesService,
              private _login: LoginService) {
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

  public loadTags(): Observable<Tag[]> {
    return this._httpClient.get<any[]>(
      'http://localhost:8080/blog/rest/tags'
    ).pipe(
      map(tagsDTO => {
        var tags: Tag[] = [];
        tagsDTO.forEach((tDTO: any) => {
          tags.push(this._utilities.tagDTOToTag(tDTO));
        });
        return tags;
      })
    )
  }

  public loadCommenti(): Observable<Commento[]> {
    return this._httpClient.get<any[]>(
      'http://localhost:8080/blog/rest/commenti'
    ).pipe(
      map(commentiDTO => {
        var commenti: Commento[] = [];
        commentiDTO.forEach((cDTO: any) => {
          commenti.push(this._utilities.commentoDTOToCommento(cDTO));
        });
        return commenti;
      })
    )
  }

  public loadCategorie(): Observable<Categoria[]> {
    return this._httpClient.get<any[]>(
      'http://localhost:8080/blog/rest/categorie'
    ).pipe(
      map(categorieDTO => {
        var categorie: Categoria[] = [];
        categorieDTO.forEach((cDTO: any) => {
          categorie.push(this._utilities.categoriaDTOToCategoria(cDTO));
        });
        return categorie;
      })
    )
  }

  public loadCategoria(id: number): Observable<Categoria> {
    return this._httpClient.get<any[]>(
      'http://localhost:8080/blog/rest/categorie/' + id
    ).pipe(
      map(cDTO => {
        return this._utilities.categoriaDTOToCategoria(cDTO);
      })
    )
  }

  public loadTag(id: number): Observable<Tag> {
    return this._httpClient.get<any[]>(
      'http://localhost:8080/blog/rest/tags/' + id
    ).pipe(
      map(tDTO => {
        return this._utilities.tagDTOToTag(tDTO);
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

  insertComment(commento: Commento): Observable<boolean> {
    return this._httpClient.post<boolean>('http://localhost:8080/blog/rest/commenti',
      JSON.stringify(commento),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  }

  insertCategory(category: Categoria): Observable<boolean> {

    const req = this._httpClient.post<boolean>('http://localhost:8080/blog/rest/categorie',
      JSON.stringify(category),
      {
        headers: {
          'Content-Type': 'application/json',
          'jwt': this._login.jwt as string
        }
      });
    return req;
  }

  updateVisibility(visibility: string, id: number): Observable<boolean> {
    return this._httpClient.put<boolean>('http://localhost:8080/blog/rest/commenti/' + id,
      visibility,
      {
        headers: {
          'Content-Type': 'application/json',
          'jwt': this._login.jwt as string
        }
      });
  }

  deleteCommento(id: number): Observable<boolean> {
    return this._httpClient.delete<boolean>('http://localhost:8080/blog/rest/commenti/' + id,
      {
        headers: {
          'Content-Type': 'application/json',
          'jwt': this._login.jwt as string
        }
      });
  }

  deleteTag(id: number): Observable<boolean> {
    return this._httpClient.delete<boolean>('http://localhost:8080/blog/rest/tags/' + id,
      {
        headers: {
          'Content-Type': 'application/json',
          'jwt': this._login.jwt as string
        }
      });
  }

  deleteCategoria(id: number): Observable<boolean> {
    return this._httpClient.delete<boolean>('http://localhost:8080/blog/rest/categorie/' + id,
      {
        headers: {
          'Content-Type': 'application/json',
          'jwt': this._login.jwt as string
        }
      });
  }

}
