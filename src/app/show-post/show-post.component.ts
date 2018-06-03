import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../services/utilities.service';
import { Commento } from '../models/commento.model';
import { Utente } from '../models/utente.model';
import { Post } from '../models/post.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';

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
  commentForm: FormGroup;

  constructor(private http: HttpService,
              private route: ActivatedRoute,
              public utilities: UtilitiesService,
              public login: LoginService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.http.loadPost(this.id).subscribe(
        (post: Post) => {
          this.post = post;
        });
    });

    this.utente = this.login.utente;
    this.login.utenteUpdated.subscribe((utente: Utente) => {
      this.utente = utente;
    });

    this.http.loadTags().subscribe(
      (tags: any[]) => {
        this.tags = tags;
      }
    );

    this.commentForm = new FormGroup({
      'commentoPost': new FormControl(null)
    });
  }

  onSubmitNewComment() {
    if (this.commentForm.valid) {

      const commento: Commento = new Commento(
        -1,
        this.commentForm.get("commentoPost").value,
        this.utilities.dateToString(new Date()),
        null,
        null,
        'unchecked',
        this.post,
        this.utente
      );

      this.http.insertComment(commento).subscribe(
        result => {
          console.log(result);
        }
      );
      this.commentForm.reset();
    }
  }

}
