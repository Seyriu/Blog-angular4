import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../services/utilities.service';
import { Commento } from '../models/commento.model';
import { Utente } from '../models/utente.model';
import { Post } from '../models/post.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtenteAndLoginService } from '../services/utente-and-login.service';
import { PostService } from '../services/post.service';
import { Tag } from '../models/tag.model';
import { TagService } from '../services/tag.service';
import { CommentoService } from '../services/commento.service';
import { ConstantsService } from '../services/constants.service';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit {
  post: Post;
  id: number;
  tags: any[];
  utente: Utente;
  serverPath: string = ConstantsService.SERVER_PATH;
  commentForm: FormGroup;

  constructor(private pSvc: PostService,
              private tSvc: TagService,
              private coSvc: CommentoService,
              private route: ActivatedRoute,
              public utilities: UtilitiesService,
              public login: UtenteAndLoginService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.pSvc.loadPost(this.id).subscribe(
        (post: Post) => {
          this.post = post;
          this.post.visite += 1;
        });
      this.pSvc.increaseViewCount(this.id).subscribe();
    });

    this.utente = this.login.utente;
    this.login.utenteUpdated.subscribe((utente: Utente) => {
      this.utente = utente;
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

    this.commentForm = new FormGroup({
      'commentoPost': new FormControl(null)
    });
  }

  onSubmitNewComment() {
    if (this.commentForm.valid) {

      const commento: Commento = new Commento(
        -1,
        this.commentForm.get("commentoPost").value,
        this.utilities.dateTimeToString(new Date()),
        null,
        null,
        'unchecked',
        this.post,
        this.utente
      );

      this.coSvc.insertComment(commento).subscribe(
        result => {
          console.log(result);
        }
      );
      this.commentForm.reset();
    }
  }

  banUser(id: number) {
    this.login.banUser(true, id).subscribe();
  }

  deleteCommento(id: number) {
    this.coSvc.deleteCommento(id).subscribe(
      (callResult: boolean) => {
        if (callResult) {
          this.pSvc.loadPost(this.id).subscribe(
            (post: Post) => {
              this.post = post;
            }
          );
        }
      }
    )
  }

}
