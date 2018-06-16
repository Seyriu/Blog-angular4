import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { UtenteAndLoginService } from './utente-and-login.service';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private readonly _SERVER_PATH = ConstantsService.SERVER_REST_PATH + 'upload/profile-image/';

  constructor(private _httpClient: HttpClient,
              private _login: UtenteAndLoginService) {
  }


  uploadProfilePic(pictureForm: FormData): Observable<Response> {
    return this._httpClient.post<Response>(this._SERVER_PATH,
      pictureForm,
      {
        headers: {
          // 'Content-Type': 'multipart/form-data',
          'jwt': this._login.jwt as string
        }
      }
    );
  }
}
