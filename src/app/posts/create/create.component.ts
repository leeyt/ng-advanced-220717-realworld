import { CreateArticle } from './../../interfaces/create-article';
import { Router } from '@angular/router';
import { PostService } from './../../post.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm = this.fb.group({
    title: this.fb.control('', Validators.required),
    description: this.fb.control(''),
    body: this.fb.control('', [Validators.required, Validators.minLength(10)]),
    tags: this.fb.array([
      // this.fb.control('HTML'),
      // this.fb.control('CSS'),
      // this.fb.control('JavaScript'),
    ]),
  });

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  addTag(tag: string) {
    this.createForm.controls.tags.push(
      this.fb.control(tag)
    );
  }

  removeTag(index: number) {
    this.createForm.controls.tags.removeAt(index);
  }

  createPost() {
    const article: CreateArticle = {
      title: this.createForm.value.title || '',
      description: this.createForm.value.description || '',
      body: this.createForm.value.body || '',
      tagList: (<Array<string>> this.createForm.value.tags || []).filter(tag => !!tag)
    };

    this.postService.createArticle(article).subscribe(() => {
      this.router.navigate(['/']);
    })
  }

}
