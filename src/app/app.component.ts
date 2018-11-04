import { Component } from '@angular/core';

import { Post } from './posts/blog-post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // createdPosts: Post[] = [];

  // onPostCreated(post) {  // gets posts from post-add.component.ts
  //   this.createdPosts.push(post);
  // }
}
