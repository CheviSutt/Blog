
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Post } from '../blog-post.model'; // post pipe
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent implements OnInit {
  // @Output() postAdded = new EventEmitter<Post>(); // Data emitted is "Post"
  // enteredTitle = '';
  // enteredContent = '';
  private mode = 'newPost'; // Component properties, hint for Vue.js
  private postId: string; // Component properties
  private post: Post;

  constructor(public postsService: PostsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if ( paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.post = this.postsService.getPost(this.postId);
      } else {
        this.mode = 'newPost';
        this.postId = null;
      }
    }); // observable listening to changes in route url/parameter
  }

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
