import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { LoginService } from '../services/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Utente } from '../models/utente.model';

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

  constructor(private http: HttpService,
              public login: LoginService) {
  }

  ngOnInit() {
    this.http.loadCategorie().subscribe(
      (categorie: any[]) => {
        this.categorie = categorie;
      });

      this.login.loginUpdated.subscribe((isLoggedIn: boolean) => {
        this.isUserLoggedIn = isLoggedIn;
      });

    this.login.utenteUpdated.subscribe((utente: Utente) => {
      this.utente = utente;
    });

      this.loginForm = new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null,
          [
            Validators.required,
            Validators.minLength(4)
          ]),
      });

      if (localStorage.getItem('blogJwt')) {
        this.jwt = localStorage.getItem('blogJwt');
        this.utente = JSON.parse(localStorage.getItem('savedUser'));
        this.login.setLoggedInAndUser(true, this.utente);
      }
    }

    onSubmit() {
      if (this.loginForm.valid) {
        this.login.login(
          this.loginForm.get('email').value,
          this.loginForm.get('password').value
        )
          .subscribe(
            (result: any) => {

              this.login.setLoggedIn(<boolean> result);
              if (result) {
                this.utente = result;
                this.login.utente = this.utente;
                this.jwt = this.login.jwt;
                localStorage.setItem('blogJwt', this.login.jwt);
                localStorage.setItem('savedUser', JSON.stringify(result));
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

    esci()
    {
      this.login.setLoggedInAndUser(false, null);
      localStorage.removeItem("blogJwt");
      localStorage.removeItem("savedUser");
    }

  }
