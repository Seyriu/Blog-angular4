import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { UtenteAndLoginService } from './utente-and-login.service';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private readonly PROFILE_PICTURE_SERVER_PATH = ConstantsService.SERVER_REST_PATH + 'upload/profile-image/';
  private readonly POST_PICTURE_SERVER_PATH = ConstantsService.SERVER_REST_PATH + 'upload/post-image/';

  constructor(private _httpClient: HttpClient,
              private _login: UtenteAndLoginService) {
  }

  uploadProfilePic(pictureForm: FormData): Observable<Response> {
    return this._httpClient.post<Response>(this.PROFILE_PICTURE_SERVER_PATH + this._login.utente.id,
      pictureForm,
      {
        headers: {
          // 'Content-Type': 'multipart/form-data',
          'jwt': this._login.jwt as string
        }
      }
    );
  }

  uploadPostPic(pictureForm: FormData, postId: number): Observable<Response> {
    return this._httpClient.post<Response>(this.POST_PICTURE_SERVER_PATH + postId,
      pictureForm,
      {
        headers: {
          'jwt': this._login.jwt as string
        }
      }
    );
  }
}
