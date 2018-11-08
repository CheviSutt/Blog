
import { Component, EventEmitter, OnInit, Output} from '@angular/core';
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
  enteredTitle = '';
  enteredContent = '';
  post: Post;
  loadingSpinner = false;
  private mode = 'newPost'; // Component properties, hint for Vue.js
  private postId: string; // Component properties

  constructor(public postsService: PostsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if ( paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.loadingSpinner = true;
        this.postsService.getPost(this.postId).subscribe(postData => { // async
          this.loadingSpinner = false;
          this.post = {id: postData._id, title: postData.title, content: postData.content}; // async
        });
      } else {
        this.mode = 'newPost';
        this.postId = null;
      }
    }); // observable listening to changes in route url/parameter
  }

  onSavePost(form: NgForm) {
    if (form.invalid) { // Keeps from posting empty fields
      return;
    }
    this.loadingSpinner = true;
    if (this.mode === 'newPost') {
      this.postsService.addPost(form.value.title, form.value.content);
    } else {
      this.postsService.updatePost(this.postId, form.value.title, form.value.content);
    }
    // const post: Post = { title: form.value.title, content: form.value.content};
    // this.postAdded.emit(post);
    // this.postsService.addPost(form.value.title, form.value.content); // Replaces Event Emitter
    form.resetForm();
  }
}
