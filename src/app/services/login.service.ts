import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs/index';
import { Utente } from '../models/utente.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _loggedIn: boolean = false;
  public loginUpdated = new Subject<boolean>();
  private _utente: Utente = null;
  public utenteUpdated = new Subject<Utente>();
  private _jwt: string;
  private _id: string;

  constructor(private _http: HttpClient) {
  }

  login(email: string, password: string): Observable<any> {

    this._http.get<String>('http://localhost:8080/blog/rest/login',
      {
        headers: {
          'Content-Type': 'application/json' as string,
          'path': '/login' as string,
          'email': email as string,
          'password': password as string,
        }
      }).subscribe(jwt => {
      this._jwt = jwt[0];
      this._id = jwt[1];
    });
    const req = this._http.get<any>('http://localhost:8080/blog/rest/utenti/' + this._id,
      {
        headers: {
          'Content-Type': 'application/json',
          'jwt': this._jwt as string,
        }
      })
    return req;
  }

  newUser(utente: Utente): Observable<boolean> {
    var jsonUtente = JSON.stringify(utente);
    return this._http.post<boolean>('http://localhost:8080/blog/rest/utenti',
      jsonUtente,
      {
        headers: { 'Content-Type': 'application/json' }
      });
  }

  getLoggedIn(): boolean {
    return this._loggedIn;
  }

  setLoggedIn(value: boolean) {
    this._loggedIn = value;
    this.loginUpdated.next(this._loggedIn);
  }

  setLoggedInAndUser(value: boolean, utente: Utente) {
    this._loggedIn = value;
    this._utente = utente;
    this.utenteUpdated.next(this._utente);
    this.loginUpdated.next(this._loggedIn);
  }


  get utente(): Utente {
    return this._utente;
  }

  set utente(value: Utente) {
    this._utente = value;
    this.utenteUpdated.next(this._utente);
  }

  get jwt(): string {
    return this._jwt;
  }

  set jwt(value: string) {
    this._jwt = value;
  }
}
