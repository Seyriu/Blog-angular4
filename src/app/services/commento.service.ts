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
export class CommentoService {
  private _commenti: Commento[] = [];
  public commentiUpdated = new Subject<Commento[]>();

  constructor(private _httpClient: HttpClient,
              private _utilities: UtilitiesService,
              private _login: UtenteAndLoginService) {
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

  insertComment(commento: Commento): Observable<boolean> {
    return this._httpClient.post<boolean>('http://localhost:8080/blog/rest/commenti',
      JSON.stringify(commento),
      {
        headers: {
          'Content-Type': 'application/json',
          'jwt': this._login.jwt as string
        }
      });
  }

  updateVisibility(visibility: string, id: number): Observable<boolean> {
    return this._httpClient.put<boolean>('http://localhost:8080/blog/rest/commenti/visibility/' + id,
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

  get commenti(): Commento[] {
    return this._commenti;
  }

  set commenti(value: Commento[]) {
    this._commenti = value;
    this.commentiUpdated.next(this._commenti);
  }
}
