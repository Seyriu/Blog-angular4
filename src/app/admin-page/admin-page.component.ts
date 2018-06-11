import { Component, ElementRef, OnInit, TemplateRef } from '@angular/core';
import { Categoria } from '../models/categoria.model';
import { Tag } from '../models/tag.model';
import { Commento } from '../models/commento.model';
import { UtilitiesService } from '../services/utilities.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../services/categoria.service';
import { TagService } from '../services/tag.service';
import { CommentoService } from '../services/commento.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Utente } from '../models/utente.model';
import { UtenteAndLoginService } from '../services/utente-and-login.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  categorie: Categoria[];
  utenti: Utente[];
  inactiveUsers: Utente[] = [];
  newCategoryForm: FormGroup;
  tags: Tag[];
  commenti: Commento[];
  commento: Commento = null;
  errMsg: string = "";
  catModalRef: BsModalRef;
  cmtModalRef: BsModalRef;

  constructor(private cSvc: CategoriaService,
              private tSvc: TagService,
              private coSvc: CommentoService,
              private login: UtenteAndLoginService,
              public utilities: UtilitiesService,
              private modalService: BsModalService) {
  }

  ngOnInit() {
    this.cSvc.loadCategorie().subscribe(
      (categorie: Categoria[]) => {
        this.cSvc.categorie = categorie;
        this.categorie = categorie;
      });

    this.cSvc.categorieUpdated.subscribe((cat: Categoria[]) => {
      this.categorie = cat;
    });

    this.tSvc.loadTags().subscribe(
      (tags: Tag[]) => {
        this.tSvc.tags = tags;
        this.tags = tags;
      }
    );

    this.tSvc.tagsUpdated.subscribe((tags: Tag[]) => {
      this.tags = tags;
    });

    this.coSvc.loadCommenti().subscribe(
      (commenti: Commento[]) => {
        this.coSvc.commenti = commenti;
        this.commenti = commenti;
      }
    );

    this.coSvc.commentiUpdated.subscribe((commenti: Commento[]) => {
      this.commenti = commenti;
    });

    this.login.loadUsers().subscribe(
      (utenti: Utente[]) => {
        this.utenti = utenti;
        this.login.utenti = utenti;
      });

    this.login.utentiUpdated.subscribe((utenti: Utente[]) => {
      this.utenti = utenti;
      this.loadInactiveUsers();
    });

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
      this.cSvc.insertCategoria(cat)
        .subscribe(
          (result: boolean) => {
            console.log(result);
            if (result) {
              this.cSvc.loadCategorie().subscribe(
                (categorie: Categoria[]) => {
                  this.categorie = categorie;
                  this.cSvc.categorie = categorie;
                  // $('#catModalClose').click();
                  this.catModalRef.hide();
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

  loadInactiveUsers() {
    this.inactiveUsers = [];
    this.utenti.forEach(
      (utente) => {
        if (utente.isActive === false) {
          this.inactiveUsers.push(utente);
        }
      })
  }

  activateUser(id: number) {
    this.login.activateUser(id).subscribe(
      (result: boolean) => {
        if (result) {
          this.login.loadUsers().subscribe(
            (utenti: Utente[]) => {
              this.utenti = utenti;
              this.login.utenti = utenti;
              this.loadInactiveUsers();
            })
        }
      });
  }

  openCatModal(catModal: TemplateRef<any>) {
    this.catModalRef = this.modalService.show(catModal);
  }

  openCmtModal(cmtModal: TemplateRef<any>) {
    this.cmtModalRef = this.modalService.show(cmtModal);
  }

  setCommento(commento: Commento) {
    this.commento = commento;
  }

  updateVisibility(commento: Commento) {
    this.coSvc.updateVisibility('true', commento.id).subscribe(
      (callResult: boolean) => {
        console.log(callResult);
        if (callResult) {
          this.coSvc.loadCommenti().subscribe(
            (commenti: Commento[]) => {
              this.commenti = commenti;
            }
          );
        }
      }
    );
  }

  deleteCommento(id: number) {
    this.coSvc.deleteCommento(id).subscribe(
      (callResult: boolean) => {
        console.log(callResult);
        if (callResult) {
          this.coSvc.loadCommenti().subscribe(
            (commenti: Commento[]) => {
              this.commenti = commenti;
              this.coSvc.commenti = commenti;
            }
          );
        }
      }
    )
  }

  deleteTag(id: number) {
    this.tSvc.deleteTag(id).subscribe(
      (callResult: boolean) => {
        console.log(callResult);
        if (callResult) {
          this.tSvc.loadTags().subscribe(
            (tags: Tag[]) => {
              this.tags = tags;
              this.tSvc.tags = tags;
            }
          );
        }
      }
    )
  }

  deleteCategoria(id: number) {
    this.cSvc.deleteCategoria(id).subscribe(
      (callResult: boolean) => {
        console.log(callResult);
        if (callResult) {
          this.cSvc.loadCategorie().subscribe(
            (categorie: Categoria[]) => {
              this.categorie = categorie;
              this.cSvc.categorie = categorie;
            }
          );
        }
      }
    )
  }
}
