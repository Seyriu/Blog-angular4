import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Categoria } from '../models/categoria.model';
import { Utente } from '../models/utente.model';
import { UtenteAndLoginService } from '../services/utente-and-login.service';
import { Post } from '../models/post.model';
import { UtilitiesService } from '../services/utilities.service';
import { Tag } from '../models/tag.model';
import { CategoriaService } from '../services/categoria.service';
import { PostService } from '../services/post.service';
import { ConstantsService } from '../services/constants.service';
import { FilesService } from '../services/files.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

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
  files: FileList;
  serverPath: string = ConstantsService.SERVER_PATH;
  previewRef: BsModalRef;
  @ViewChild('postPicture') postPicture;

  categorie: Categoria[];


  constructor(private cSvc: CategoriaService,
              private login: UtenteAndLoginService,
              private pSvc: PostService,
              private utilities: UtilitiesService,
              private fileService: FilesService,
              private modalService: BsModalService) {
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
    const tags: Tag[] = [];
    let tag: Tag;
    let names: string[];
    if (text) {
      names = text.split('#');
      for (let i = 0; i < names.length; i++) {
        if (i > 0) {
          if (names[i].indexOf(' ') > 0) {
            names[i] = names[i].substr(0, names[i].indexOf(' '));
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

  selectFile(event) {
    this.files = this.postPicture.nativeElement.files;
  }

  onSubmitNewPost() {

    console.log('posting...');
    if (this.postForm.valid) {

      this.post = new Post(
        -1,
        this.postForm.get('titoloPost').value,
        this.postForm.get('testoPost').value,
        this.utilities.dateTimeToString(new Date()),
        true,
        0,
        null, // image
        this._categoria,
        this.utente,
        null,
        null
      );
      const formData = new FormData();
      formData.append('postPicture', this.files[0]);
      console.log(formData, this.files[0]);
      this.pSvc.insertPost(this.post).subscribe(
        (postId: number) => {
          this.fileService.uploadPostPic(formData, postId).subscribe(
            (response: Response) => {
              console.log(response);
            });
        }
      );
      this.postForm.reset();
    }
  }

  openPreviewModal(previewModal: TemplateRef<any>) {
    this.previewRef = this.modalService.show(previewModal);
  }

}
