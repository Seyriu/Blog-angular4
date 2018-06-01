import { Ruolo } from './ruolo.model';

export class Utente {
  constructor(
    public id: number,
    public email: string,
    public password: string,
    public isActive: boolean,
    public isBanned: boolean,
    public failedAccessAttempts: number,
    public dateCreationAsString: string,
    public dateLastAccessAsString: string,
    public ruolo: Ruolo,
  ) {}
}
