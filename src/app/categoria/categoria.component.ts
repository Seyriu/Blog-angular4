import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from '../models/categoria.model';
import { CategoriaService } from '../services/categoria.service';
import { TagService } from '../services/tag.service';
import { Tag } from '../models/tag.model';
import { PageChangedEvent } from 'ngx-bootstrap';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categoria: any;
  id: number;
  tags: any[];
  public visiblePosts: Post[] = [];
  public returnedPostArray: Post[] = [];
  public currentPage: number = 1;

  constructor(private cSvc: CategoriaService,
              private route: ActivatedRoute,
              private tSvc: TagService) {
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.cSvc.loadCategoria(this.id).subscribe(
        (categoria: Categoria) => {
          this.categoria = categoria;
          this.visiblePosts = [];
          this.returnedPostArray = [];

          this.categoria.posts.forEach((post: Post) => {
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
