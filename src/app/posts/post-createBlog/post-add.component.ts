
import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../blog-post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent {
  // @Output() postAdded = new EventEmitter<Post>(); // Data emitted is "Post"

  constructor(public postsService: PostsService) {}

  onAddPost(form: NgForm) {
    if (form.invalid) { // Keeps from posting empty fields
      return;
    }
    // const post: Post = { title: form.value.title, content: form.value.content};
    // this.postAdded.emit(post);
    this.postsService.addPost(form.value.title, form.value.content); // Replaces Event Emitter
    form.resetForm();
  }
}
