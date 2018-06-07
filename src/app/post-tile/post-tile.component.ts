import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';
import { Post } from '../models/post.model';
import { Utente } from '../models/utente.model';
import { UtenteAndLoginService } from '../services/utente-and-login.service';
import { Subscription } from 'rxjs/index';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit, OnDestroy {
  @Input() post: Post;
  utente: Utente = null;
  utenteSub: Subscription;

  constructor(public utilities: UtilitiesService,
              private login: UtenteAndLoginService) { }

  ngOnInit() {
    this.utente = this.login.utente;
    this.utenteSub = this.login.utenteUpdated.subscribe(
      (utente: Utente) => {
       this.utente = utente;
      });
  }

  ngOnDestroy() {
    this.utenteSub.unsubscribe();
  }

}
