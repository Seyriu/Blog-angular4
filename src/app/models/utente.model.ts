import { Ruolo } from './ruolo.model';

export class Utente {
  constructor(
    public id: number,
    public email: string,
    public isActive: boolean,
    public isBanned: boolean,
    public image: string,
    public failedAccessAttempts: number,
    public dateCreationAsString: string,
    public dateLastAccessAsString: string,
    public ruolo: Ruolo,
  ) {}
}
