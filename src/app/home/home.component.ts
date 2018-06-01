import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any[];
  tags: any[];
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.http.loadPosts().subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      });

      this.http.loadTags().subscribe(
        (tags: any[])=> {
          this.tags=tags;
        }
      );
  }

}
