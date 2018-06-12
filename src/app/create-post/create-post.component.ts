import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Categoria } from '../models/categoria.model';
import { Utente } from '../models/utente.model';
import { UtenteAndLoginService } from '../services/utente-and-login.service';
import { Post } from '../models/post.model';
import { UtilitiesService } from '../services/utilities.service';
import { Tag } from '../models/tag.model';
import { CategoriaService } from '../services/categoria.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  postForm: FormGroup;
  post: Post;
  titolo: String;
  private _categoria: Categoria;
  testo: String;
  utente: Utente;

  categorie: Categoria[];


  constructor(private cSvc: CategoriaService,
              private login: UtenteAndLoginService,
              private pSvc: PostService,
              private utilities: UtilitiesService) {
  }

  ngOnInit() {

    this.utente = this.login.utente;
    this.login.utenteUpdated.subscribe((utente: Utente) => {
      this.utente = utente;
    });

    this.cSvc.loadCategorie().subscribe(
      (categorie: Categoria[]) => {
        this.cSvc.categorie = categorie;
        this.categorie = categorie;
        this._categoria = categorie[0];
      });

    this.cSvc.categorieUpdated.subscribe((cat: Categoria[]) => {
      this.categorie = cat;
    });

    this.postForm = new FormGroup({
      'titoloPost': new FormControl(null, [Validators.required]),
      'categoriaPost': new FormControl(null, [Validators.required]),
      'testoPost': new FormControl(null, [Validators.required])
    });
  }

  setCategoria(catNumber: number) {
    this._categoria = this.categorie[catNumber];
  }

  getHashTags(text: string): Tag[] {
    var tags: Tag[] = [];
    var tag: Tag;
    var names: string[];
    if (text) {
      names = text.split("#");
      for (var i = 0; i < names.length; i++) {
        if (i > 0) {
          if (names[i].indexOf(" ") > 0) {
            names[i] = names[i].substr(0, names[i].indexOf(" "));
          } else {
            names[i] = names[i].substr(0);
          }
          tag = new Tag(-1, names[i], null);
          tags.push(tag);
        }
      }
    }

    return tags;
  }

  onSubmitNewPost() {

    console.log("posting...");
    if (this.postForm.valid) {

      this.post = new Post(
        null,
        this.postForm.get("titoloPost").value,
        this.postForm.get("testoPost").value,
        this.utilities.dateTimeToString(new Date()),
        true,
        0,
        this._categoria,
        this.utente,
        null,
        this.getHashTags(this.postForm.get("testoPost").value)
      );

      this.pSvc.insertPost(this.post).subscribe(
        result => {
          console.log(result);
        }
      );
      this.postForm.reset();
    }
  }


}
