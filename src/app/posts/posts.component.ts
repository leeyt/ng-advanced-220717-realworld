import { Article } from './../interfaces/article';
import { PostService } from './../post.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, map, of } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  articles: Article[] = [];
  articles$: Observable<Article[]> = of([]);

  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.articles$ = this.postService.getArticles()
      .pipe(
        map(resp => resp.articles),
      );
  }

}
