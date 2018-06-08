import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tag } from '../models/tag.model';
import { TagService } from '../services/tag.service';
import { Post } from '../models/post.model';
import { PageChangedEvent } from 'ngx-bootstrap';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  mainTag: any;
  id: number;
  tags: any[];
  public visiblePosts: Post[] = [];
  public returnedPostArray: Post[] = [];
  public currentPage: number = 1;

  constructor(private tSvc: TagService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.tSvc.loadTag(this.id).subscribe(
        (tag: Tag) => {
          this.mainTag = tag;
          this.visiblePosts = [];
          this.returnedPostArray = [];

          this.mainTag.posts.forEach((post: Post) => {
            post.visibile ? this.visiblePosts.push(post) : "";
          });
          this.returnedPostArray = this.visiblePosts.slice(0, 6);
        });
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

  setPage(pageNo: number) {
    this.currentPage = pageNo;
  }

  pageChanged(event: PageChangedEvent) {
    this.currentPage = event.page;
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedPostArray = this.visiblePosts.slice(startItem, endItem);
  }

}
