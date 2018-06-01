import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categoria: any;
  id: number;
  tags: any[];

  constructor(private http: HttpService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.http.loadCategoria(this.id).subscribe(
        (categoria: any[]) => {
          this.categoria = categoria;
        });
    });

    this.http.loadTags().subscribe(
      (tags: any[]) => {
        this.tags = tags;
      }
    );
  }

}
