import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { UtilitiesService } from './utilities.service';
import { UtenteAndLoginService } from './utente-and-login.service';
import { Categoria } from '../models/categoria.model';

@Injectable()
export class CategoriaService {
  private _categorie: Categoria[] = [];
  public categorieUpdated = new Subject<Categoria[]>();

  constructor(private _httpClient: HttpClient,
              private _utilities: UtilitiesService,
              private _login: UtenteAndLoginService) {
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

  insertCategoria(categoria: Categoria): Observable<boolean> {

    const req = this._httpClient.post<boolean>('http://localhost:8080/blog/rest/categorie',
      JSON.stringify(categoria),
      {
        headers: {
          'Content-Type': 'application/json',
          'jwt': this._login.jwt as string
        }
      });
    return req;
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

  get categorie(): Categoria[] {
    return this._categorie;
  }

  set categorie(value: Categoria[]) {
    this._categorie = value;
    this.categorieUpdated.next(this._categorie);
  }
}
