import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { UtenteAndLoginService } from './utente-and-login.service';
import { Observable } from 'rxjs/index';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private login: UtenteAndLoginService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.login.loggedIn &&
      this.login.utente.isActive === true &&
      this.login.utente.isBanned === false
    ) {
      return true;
    } else {
      ;this.router.navigate(['/forbidden']);
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
