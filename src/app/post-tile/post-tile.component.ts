import { Component, OnInit, Input } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {
  @Input() post: Post;

  constructor(public utilities: UtilitiesService ) { }

  ngOnInit() {
  }

}
