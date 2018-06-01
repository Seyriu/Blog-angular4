import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Utente } from '../models/utente.model';
import { LoginService } from '../services/login.service';
import { UtilitiesService } from '../services/utilities.service';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css']
})
export class RegistrazioneComponent implements OnInit {
  private utente: Utente = null;
  regForm: FormGroup;
  utenteInserito: string;

  constructor(public login: LoginService,
              private utilities: UtilitiesService) {
  }

  ngOnInit() {
    this.regForm = new FormGroup({
      'emailSU': new FormControl(null, [Validators.required, Validators.email]),
      'passwordSU': new FormControl(null,
        [
          Validators.required,
          Validators.minLength(4)
          // this.passwordsNotMatching.bind(this)
        ]),
      'passwordRe': new FormControl(null, [
        Validators.required
        // this.passwordReNotMatching.bind(this)
      ])
    });
  }

  onSubmitNewUser() {
    this.utente = new Utente(
      null,
      this.regForm.get('emailSU').value,
      this.regForm.get('passwordSU').value,
      false,
      false,
      0,
      this.utilities.dateToString(new Date()),
      this.utilities.dateToString(new Date()),
      null//new Ruolo(3, "utente"),
    );
    if (this.regForm.valid) {
      this.login.newUser(this.utente).subscribe((result: boolean) => {
        if (!result) {
          this.utenteInserito = 'error';
        } else {
          this.utenteInserito = 'success';
        }
      });

      this.regForm.reset();
    }
  }

  passwordsNotMatching(control?: FormControl): { [s: string]: boolean } {
    if (this.regForm &&
      (control.value !== this.regForm.get('passwordRe').value)
    ) {
      return {'passwordDiverse': true};
    }
    // return null;
  }

  passwordReNotMatching(control?: FormControl): { [s: string]: boolean } {
    if (this.regForm &&
      (control.value !== this.regForm.get('passwordSU').value)
    ) {
      return {'passwordDiverse': true};
    }
    // return null;
  }

}
