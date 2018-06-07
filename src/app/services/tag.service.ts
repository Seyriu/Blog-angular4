import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { UtilitiesService } from './utilities.service';
import { Tag } from '../models/tag.model';
import { UtenteAndLoginService } from './utente-and-login.service';

@Injectable()
export class TagService {
  private _tags: Tag[] = [];
  public tagsUpdated = new Subject<Tag[]>();

  constructor(private _httpClient: HttpClient,
              private _utilities: UtilitiesService,
              private _login: UtenteAndLoginService) {
  }

  public loadTags(): Observable<Tag[]> {
    return this._httpClient.get<any[]>(
      'http://localhost:8080/blog/rest/tags'
    ).pipe(
      map(tagsDTO => {
        var tags: Tag[] = [];
        tagsDTO.forEach((tDTO: any) => {
          tags.push(this._utilities.tagDTOToTag(tDTO));
        });
        return tags;
      })
    )
  }

  public loadTag(id: number): Observable<Tag> {
    return this._httpClient.get<any[]>(
      'http://localhost:8080/blog/rest/tags/' + id
    ).pipe(
      map(tDTO => {
        return this._utilities.tagDTOToTag(tDTO);
      })
    )
  }

  deleteTag(id: number): Observable<boolean> {
    return this._httpClient.delete<boolean>('http://localhost:8080/blog/rest/tags/' + id,
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
