import { Component, OnInit } from '@angular/core';
import { Categoria } from '../models/categoria.model';
import { Tag } from '../models/tag.model';
import { HttpService } from '../services/http.service';
import { Commento } from '../models/commento.model';
import { UtilitiesService } from '../services/utilities.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  categorie: Categoria[];
  newCategoryForm: FormGroup;
  tags: Tag[];
  commenti: Commento[];
  commento: Commento = null;
  errMsg: string = "";

  constructor(private http: HttpService,
              public utilities: UtilitiesService) {
  }

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

    this.newCategoryForm = new FormGroup({
      'nomeCat': new FormControl(null, [
        Validators.required
      ]),
      'descCat': new FormControl(null),
      'imgCat': new FormControl(null)
    });
  }

  onSubmitNewCategory() {
    if (this.newCategoryForm.valid) {
      const cat: Categoria = new Categoria(
        -1,
        this.newCategoryForm.get('nomeCat').value,
        this.newCategoryForm.get('descCat').value,
        this.newCategoryForm.get('imgCat').value,
        null
      )
      this.http.insertCategory(cat)
        .subscribe(
          (result: boolean) => {
            console.log(result);
            if (result) {
              this.http.loadCategorie().subscribe(
                (categorie: Categoria[]) => {
                  this.categorie = categorie;
                  $('#catModalClose').click();
                });
            }
          },
          err => {
            console.log("Errore di comunicazione col server: " + err);
          }
        );
      this.newCategoryForm.reset();
    } else {
      if (!this.newCategoryForm.get('nomeCat').valid) {
        this.errMsg = 'Inserire il nome di una categoria!';
      }
    }
  }

  setCommento(commento: Commento) {
    this.commento = commento;
  }

  updateVisibility(commento: Commento) {
    this.http.updateVisibility('true', commento.id).subscribe(
      (callResult: boolean) => {
        console.log(callResult);
        if (callResult) {
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
        if (callResult) {
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
        if (callResult) {
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
        if (callResult) {
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
