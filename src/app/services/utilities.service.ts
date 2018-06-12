import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Utente } from '../models/utente.model';
import { Ruolo } from '../models/ruolo.model';
import { Tag } from '../models/tag.model';
import { Categoria } from '../models/categoria.model';
import { Commento } from '../models/commento.model';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() {
  }

  // transforms a given string date into Date type (year-month-day format)
  public localDateToDate(localDate?: any): Date {
    if (localDate !== null) {
      return new Date(+localDate.year, +localDate.monthValue - 1, +localDate.dayOfMonth + 1);
    }
    return null;
  }

  public localDateToString(localDate?: any): string {
    if (localDate !== null) {
      const day: string = String((localDate.dayOfMonth < 10) ? "0" + localDate.dayOfMonth : localDate.dayOfMonth);
      const month: string = String(((localDate.monthValue + 1) < 10) ? "0" + (localDate.monthValue + 1) : (localDate.monthValue + 1));
      const year: string = String(localDate.year);
      return year + "-" + month + "-" + day;
    }
    return null;
  }

  public dateTimeToString(date?: Date): string {
    if (date !== null) {
      const day: string = String(this.addAZero(date.getDate()));
      const month: string = String(this.addAZero(date.getMonth() + 1));
      const year: string = String(date.getFullYear());
      const hours: string = String(this.addAZero(date.getHours()));
      const minutes: string = String(this.addAZero(date.getMinutes()));
      const seconds: string = String(this.addAZero(date.getSeconds()));
      return year + "-" + month + "-" + day + "T" + hours + ":" + minutes + ":00";
    }
    return null;
  }

  public stringToDateTime(stringDate?: string): Date {
    if (stringDate) {
      const splitStringArray = stringDate.split('T');
      const dateSplitArray = splitStringArray[0].split('-');
      const timeSplitArray = splitStringArray[1].split(':');
      return new Date(+dateSplitArray[0], +dateSplitArray[1] - 1, +dateSplitArray[2] + 1, +timeSplitArray[0], +timeSplitArray[1], 0, 0);
    }
    return null;
  }

  private addAZero(stringNumber: number) {
    return (stringNumber < 10) ? "0" + stringNumber : stringNumber;
  }

  public postDTOToPost(pDTO: any): Post {
    let tags: Tag[] = [];
    if (pDTO.tags) {
      pDTO.tags.forEach(
        tDTO => {
          tags.push(this.tagDTOToTag(tDTO));
        });
    }

    let commenti: Commento[] = [];
    if (pDTO.commenti) {
      pDTO.commenti.forEach(
        cDTO => {
          commenti.push(this.commentoDTOToCommento(cDTO));
        });
    }

    return new Post(
      pDTO.id,
      pDTO.titolo,
      pDTO.descrizione,
      pDTO.dataPostAsString,
      pDTO.visibile,
      pDTO.visite,
      this.categoriaDTOToCategoria(pDTO.categoria),
      this.utenteDTOToUtente(pDTO.utente),
      commenti,
      tags
    );
  }

  public utenteDTOToUtente(uDTO: any): Utente {
    return new Utente(
      uDTO.id,
      uDTO.email,
      uDTO.password,
      uDTO.isActive,
      uDTO.isBanned,
      uDTO.failedAccessAttempts,
      uDTO.dateCreationAsString,
      uDTO.dateLastAccessAsString,
      this.ruoloDTOToRuolo(uDTO.ruolo)
    );
  }

  public ruoloDTOToRuolo(rDTO: any): Ruolo {
    return new Ruolo(
      rDTO.id,
      rDTO.nome
    );
  }

  public tagDTOToTag(tDTO: any): Tag {
    let posts: Post[] = [];
    if (tDTO.posts) {
      tDTO.posts.forEach(
        pDTO => {
          posts.push(this.postDTOToPost(pDTO));
        });
    }

    return new Tag(
      tDTO.id,
      tDTO.nome,
      posts
    );
  }

  public categoriaDTOToCategoria(cDTO: any): Categoria {

    let posts: Post[] = [];
    if (cDTO.posts) {
      cDTO.posts.forEach(
        pDTO => {
          posts.push(this.postDTOToPost(pDTO));
        });
    }

    const cat = new Categoria(
      cDTO.id,
      cDTO.nome,
      cDTO.descrizione,
      cDTO.immagine,
      posts
    );
    return cat;
  }

  public commentoDTOToCommento(cDTO: any): Commento {
    return new Commento(
      cDTO.id,
      cDTO.testo,
      cDTO.dataInserimentoAsString,
      cDTO.dataRispostaAsString,
      cDTO.risposta,
      cDTO.visibile,
      this.postDTOToPost(cDTO.post),
      this.utenteDTOToUtente(cDTO.utente),
    );
  }
}
