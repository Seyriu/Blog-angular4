import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from '../models/categoria.model';
import { CategoriaService } from '../services/categoria.service';
import { TagService } from '../services/tag.service';
import { Tag } from '../models/tag.model';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categoria: any;
  id: number;
  tags: any[];

  constructor(private cSvc: CategoriaService,
              private route: ActivatedRoute,
              private tSvc: TagService
              ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.cSvc.loadCategoria(this.id).subscribe(
        (categoria: Categoria) => {
          this.categoria = categoria;
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

}
