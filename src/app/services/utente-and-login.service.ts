import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs/index';
import { Utente } from '../models/utente.model';
import { map } from 'rxjs/internal/operators';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class UtenteAndLoginService {
  private _utenti: Utente[];
  public utentiUpdated = new Subject<Utente[]>();
  private _loggedIn: boolean = false;
  public loginUpdated = new Subject<boolean>();
  private _utente: Utente = null;
  public utenteUpdated = new Subject<Utente>();
  private _jwt: string;
  public jwtUpdated = new Subject<string>();
  private _id: string;

  constructor(private _http: HttpClient, private _utilities: UtilitiesService) {
    if (localStorage.getItem('blogJwt')) {
      this._jwt = localStorage.getItem('blogJwt');
      this._utente = JSON.parse(localStorage.getItem('savedUser'));
      this._loggedIn = true;
      this.utenteUpdated.next(this._utente);
      this.loginUpdated.next(this._loggedIn);
      this.jwtUpdated.next(this._jwt);
    }
  }

  login(email: string, password: string): Observable<boolean> {
    return this._http.get<String>('http://localhost:8080/blog/rest/login',
      {
        headers: {
          'Content-Type': 'application/json' as string,
          'path': '/login' as string,
          'email': email as string,
          'password': password as string,
        }
      }).pipe(
      map(jwt => {
          this.jwt = jwt[0];
          this._id = jwt[1];
          this.loggedIn = true;
          return true;
        },
        err => {
          this.jwt = "";
          this._id = "";
          this.loggedIn = false;
          return false;
        }
      )
    );
  }

  public loadUsers(): Observable<Utente[]> {
    return this._http.get<any[]>(
      'http://localhost:8080/blog/rest/utenti',
      {
        headers: {
          'Content-Type': 'application/json',
          'jwt': this.jwt,
        }
      }).pipe(
      map(utentiDTO => {
        let utenti: Utente[] = [];
        utentiDTO.forEach((uDTO: any) => {
          utenti.push(this._utilities.utenteDTOToUtente(uDTO));
        });
        return utenti;
      })
    )
  }

  loadUser(id: number, jwt: string): Observable<Utente> {
    return this._http.get<Utente>('http://localhost:8080/blog/rest/utenti/' + id,
      {
        headers: {
          'Content-Type': 'application/json',
          'jwt': jwt,
        }
      })
  }

  activateUser(id: number): Observable<boolean> {
    return this._http.put<boolean>('http://localhost:8080/blog/rest/utenti/activated/' + id,
      true,
      {
        headers: {
          'Content-Type': 'application/json',
          'jwt': this.jwt,
        }
      })
  }

  banUser(ban: boolean, id: number): Observable<boolean> {
    return this._http.put<boolean>('http://localhost:8080/blog/rest/utenti/banned/' + id,
      ban,
      {
        headers: {
          'Content-Type': 'application/json',
          'jwt': this.jwt,
        }
      })
  }

  increaseFailedAccessAttempts(email: string): Observable<boolean> {
    console.log(email);
    return this._http.put<boolean>('http://localhost:8080/blog/rest/utenti/failed-accesses',
      email,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
  }

  newUser(utente: Utente): Observable<boolean> {
    var jsonUtente = JSON.stringify(utente);
    return this._http.post<boolean>('http://localhost:8080/blog/rest/utenti',
      jsonUtente,
      {
        headers: {'Content-Type': 'application/json'}
      });
  }

  get loggedIn(): boolean {
    return this._loggedIn;
  }

  set loggedIn(value: boolean) {
    this._loggedIn = value;
    this.loginUpdated.next(this._loggedIn);
  }

  setLoggedInAndUser(value: boolean, utente: Utente) {
    this._loggedIn = value;
    this._utente = utente;
    this.utenteUpdated.next(this._utente);
    this.loginUpdated.next(this._loggedIn);
  }

  get utenti(): Utente[] {
    return this._utenti;
  }

  set utenti(value: Utente[]) {
    this._utenti = value;
    this.utentiUpdated.next(this._utenti);
  }

  get utente(): Utente {
    if (localStorage.getItem('blogJwt')) {
      this._jwt = localStorage.getItem('blogJwt');
      this._utente = JSON.parse(localStorage.getItem('savedUser'));
      this._loggedIn = true;
    }
    return this._utente;
  }

  set utente(value: Utente) {
    this._utente = value;
    this.utenteUpdated.next(this._utente);
    localStorage.setItem('savedUser', JSON.stringify(value));
  }

  get jwt(): string {
    if (localStorage.getItem('blogJwt')) {
      this._jwt = localStorage.getItem('blogJwt');
      this._utente = JSON.parse(localStorage.getItem('savedUser'));
      this._loggedIn = true;
    }
    return this._jwt;
  }

  set jwt(value: string) {
    localStorage.setItem('blogJwt', value);
    this.jwtUpdated.next(value);
    this._jwt = value;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }
}
