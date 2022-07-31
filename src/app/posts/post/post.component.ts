import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { map, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Article } from './../../interfaces/article';
import { PostService } from './../../post.service';

@Component({
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  article$: Observable<Article> = of(<Article>{});

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.article$ = this.route.paramMap
      .pipe(
        map(params => params.get('id')),
        switchMap(id => this.postService.getArticle(id!)),
        map(resp => resp.article)
      );
  }

}
