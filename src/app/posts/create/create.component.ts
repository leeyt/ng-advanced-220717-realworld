import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm = this.fb.group({
    title: this.fb.control(''),
    description: this.fb.control(''),
    body: this.fb.control(''),
    tags: this.fb.array([
      // this.fb.control('HTML'),
      // this.fb.control('CSS'),
      // this.fb.control('JavaScript'),
    ]),
  });

  constructor(
    private fb: FormBuilder,
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

  onSubmit(form: FormGroup) {

  }

}
