import { Component, OnInit } from '@angular/core';
import { Categoria } from '../models/categoria.model';
import { Tag } from '../models/tag.model';
import { HttpService } from '../services/http.service';
import { Commento } from '../models/commento.model';
import { UtilitiesService } from '../services/utilities.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  categorie: Categoria[];
  tags: Tag[];
  commenti: Commento[];
  commento: Commento = null;

  constructor(private http: HttpService,
              public utilities: UtilitiesService) { }

  ngOnInit() {
    this.http.loadCategorie().subscribe(
      (categorie: Categoria[]) => {
        this.categorie = categorie;
      });

    this.http.loadTags().subscribe(
      (tags: Tag[]) => {
        this.tags = tags;
      }
    );

    this.http.loadCommenti().subscribe(
      (commenti: Commento[]) => {
        this.commenti = commenti;
      }
    );
  }

  setCommento(commento: Commento) {
    this.commento = commento;
  }

  updateVisibility(commento: Commento) {
    this.http.updateVisibility('true', commento.id).subscribe(
      (callResult: boolean) => {
        console.log(callResult);
        if(callResult) {
          this.http.loadCommenti().subscribe(
            (commenti: Commento[]) => {
              this.commenti = commenti;
            }
          );
        }
      }
    );
  }

  deleteCommento(id: number) {
    this.http.deleteCommento(id).subscribe(
      (callResult: boolean) => {
        console.log(callResult);
        if(callResult) {
          this.http.loadCommenti().subscribe(
            (commenti: Commento[]) => {
              this.commenti = commenti;
            }
          );
        }
      }
    )
  }

  deleteTag(id: number) {
    this.http.deleteTag(id).subscribe(
      (callResult: boolean) => {
        console.log(callResult);
        if(callResult) {
          this.http.loadTags().subscribe(
            (tags: Tag[]) => {
              this.tags = tags;
            }
          );
        }
      }
    )
  }

  deleteCategoria(id: number) {
    this.http.deleteCategoria(id).subscribe(
      (callResult: boolean) => {
        console.log(callResult);
        if(callResult) {
          this.http.loadCategorie().subscribe(
            (categorie: Categoria[]) => {
              this.categorie = categorie;
            }
          );
        }
      }
    )
  }
}
