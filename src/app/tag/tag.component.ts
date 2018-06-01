import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  mainTag: any;
  id: number;
  tags: any[];

  constructor(private http: HttpService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.http.loadTag(this.id).subscribe(
        (tag: any) => {
          this.mainTag = tag;
        });
    });

    this.http.loadTags().subscribe(
      (tags: any[]) => {
        this.tags = tags;
      }
    );
  }

}
