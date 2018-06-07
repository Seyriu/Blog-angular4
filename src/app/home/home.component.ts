import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';
import { TagService } from '../services/tag.service';
import { Tag } from '../models/tag.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any[];
  tags: any[];

  constructor(private pSvc: PostService,
              private tSvc: TagService
              ) { }

  ngOnInit() {
    this.pSvc.loadPosts().subscribe(
      (posts: Post[]) => {
        this.posts = posts;
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
  }

}
