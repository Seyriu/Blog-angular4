import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  public static readonly SERVER_PATH: string = 'http://localhost:8080/';
  public static readonly SERVER_REST_PATH: string = 'http://localhost:8080/blog/rest/';
  public static readonly PROFILE_PICTURES_PATH: string = 'blog/profile-pictures/';
  public static readonly POST_PICTURES_PATH: string = 'blog/post-pictures/';

  constructor() {
  }

}
