import { Component, OnInit, TemplateRef } from '@angular/core';
import { UtenteAndLoginService } from '../services/utente-and-login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Utente } from '../models/utente.model';
import { Categoria } from '../models/categoria.model';
import { CategoriaService } from '../services/categoria.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

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
  errMsg: string[] = [];
  loginModalRef: BsModalRef;

  // if user is still logged out, detect when the user will be logged in (asynchronously)
  detectUserLogin: string = '';

  constructor(private cSvc: CategoriaService,
              private router: Router,
              private modalService: BsModalService,
              public login: UtenteAndLoginService) {
  }

  ngOnInit() {
    if (this.login.loggedIn) {
      this.isUserLoggedIn = this.login.loggedIn;
      this.utente = this.login.utente;
      this.jwt = this.login.jwt;
    }
    this.cSvc.loadCategorie().subscribe(
      (categorie: Categoria[]) => {
        this.cSvc.categorie = categorie;
        this.categorie = categorie;
      });

    this.cSvc.categorieUpdated.subscribe((cat: Categoria[]) => {
      this.categorie = cat;
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
      const email = this.loginForm.get('email').value;

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
                  this.detectUserLogin = 'true';
                  this.loginModalRef.hide();
                });
            }
          },
          err => {
            this.errMsg = [];
            this.detectUserLogin = 'false';
            this.errMsg.push('Nome  utente / password incorretti');
            this.login.setLoggedInAndUser(false, null);
            this.login.increaseFailedAccessAttempts(email).subscribe();
          }
        );
      this.loginForm.reset();
    } else {
      this.errMsg = [];
      this.detectUserLogin = 'false';
      this.login.setLoggedInAndUser(false, null);
      if (!this.loginForm.get('email').valid) {
        this.errMsg.push('Email non valida!');
      }
      if (!this.loginForm.get('password').valid) {
        this.errMsg.push('Password non valida!');
      }
    }
  }

  openLoginModal(loginModal: TemplateRef<any>) {
    this.loginModalRef = this.modalService.show(loginModal);
  }

  accediButtonClicked() {
    this.accediButtonIsClicked = true;
    window.setTimeout(() => {
      this.accediButtonIsClicked = false;
    }, 3000);
  }

  esci() {
    this.login.setLoggedInAndUser(false, null);
    this.detectUserLogin = '';
    this.errMsg = [];
    localStorage.removeItem("blogJwt");
    localStorage.removeItem("savedUser");
    this.router.navigateByUrl('/home');
  }

}
