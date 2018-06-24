import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { UtilitiesService } from './utilities.service';
import { Tag } from '../models/tag.model';
import { UtenteAndLoginService } from './utente-and-login.service';
import { ConstantsService } from './constants.service';

@Injectable()
export class TagService {
  private _tags: Tag[] = [];
  public tagsUpdated = new Subject<Tag[]>();
  private readonly _SERVER_PATH = ConstantsService.SERVER_REST_PATH + 'tags/';

  constructor(private _httpClient: HttpClient,
              private _utilities: UtilitiesService,
              private _login: UtenteAndLoginService) {
  }

  public loadTags(): Observable<Tag[]> {
    return this._httpClient.get<any[]>(this._SERVER_PATH).pipe(
      map(tagsDTO => {
        const tags: Tag[] = [];
        tagsDTO.forEach((tDTO: any) => {
          tags.push(this._utilities.tagDTOToTag(tDTO));
        });
        return tags;
      })
    );
  }

  public loadTag(id: number): Observable<Tag> {
    return this._httpClient.get<any[]>(
      this._SERVER_PATH + id
    ).pipe(
      map(tDTO => {
        return this._utilities.tagDTOToTag(tDTO);
      })
    );
  }

  deleteTag(id: number): Observable<boolean> {
    return this._httpClient.delete<boolean>(this._SERVER_PATH + id,
      {
        headers: {
          'Content-Type': 'application/json',
          'jwt': this._login.jwt as string
        }
      });
  }

  get tags(): any[] {
    return this._tags;
  }

  set tags(value: any[]) {
    this._tags = value;
    this.tagsUpdated.next(this._tags);
  }
}
