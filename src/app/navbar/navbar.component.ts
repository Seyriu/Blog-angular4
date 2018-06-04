import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { LoginService } from '../services/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Utente } from '../models/utente.model';
import { Categoria } from '../models/categoria.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  categorie: any[];
  utente: Utente = null;
  loginForm: FormGroup;
  jwt: string;
  isUserLoggedIn: boolean = false;
  accediButtonIsClicked = false;

  constructor(private http: HttpService,
              public login: LoginService) {
  }

  ngOnInit() {
    if (this.login.loggedIn) {
      this.isUserLoggedIn = this.login.loggedIn;
      this.utente = this.login.utente;
      this.jwt = this.login.jwt;
    }

    this.http.loadCategorie().subscribe(
      (categorie: Categoria[]) => {
        this.categorie = categorie;
      });

    this.login.loginUpdated.subscribe((isLoggedIn: boolean) => {
      this.isUserLoggedIn = isLoggedIn;
    });

    this.login.utenteUpdated.subscribe((utente: Utente) => {
      this.utente = utente;
    });

    this.login.jwtUpdated.subscribe((jwt: string) => {
      this.jwt = jwt;
    });

    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null,
        [
          Validators.required,
          Validators.minLength(4)
        ]),
    });

  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.login.login(
        this.loginForm.get('email').value,
        this.loginForm.get('password').value
      )
        .subscribe(
          (isLoggedIn: boolean) => {
            if (isLoggedIn) {
              this.login.loadUser(+this.login.id, this.login.jwt).subscribe(
                (utente: Utente) => {
                  this.utente = utente;
                  localStorage.setItem('savedUser', JSON.stringify(utente));
                  this.login.utente = this.utente;
                });
            }
          },
          err => {
            this.login.setLoggedInAndUser(false, null);
          }
        );
      this.loginForm.reset();
    } else {
      this.login.setLoggedInAndUser(false, null);
    }
  }

  accediButtonClicked() {
    this.accediButtonIsClicked = true;
    window.setTimeout(() => {
      this.accediButtonIsClicked = false;
    }, 3000);
  }

  esci() {
    this.login.setLoggedInAndUser(false, null);
    localStorage.removeItem("blogJwt");
    localStorage.removeItem("savedUser");
  }

}
