
import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../blog-post.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent {
  titleEntered = '';
  contentEntered = '';
   @Output() postAdded = new EventEmitter<Post>(); // Data emitted is "Post"

  onAddPost(form: NgForm) {
    if (form.invalid) { // Keeps from posting empty fields
      return;
    }
    const post: Post = { title: form.value.title, content: form.value.content};
    this.postAdded.emit(post);
  }
}
