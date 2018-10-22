import { Post } from './blog-post.model';
// import { Injectable } from '@angular/core'; // getting an error
import { Subject } from 'rxjs/Subject';

// @Injectable({providedIn: 'root'}) // applies service to the root, you can also import and providers=postsServices in app.module
export class PostsService {
  private posts: Post[] = [];
  private updatedPosts = new Subject<Post[]>();

  getPosts() {
    return [...this.posts]; // spread operator
  }

  getUpdatedPostsListener() {
    return this.updatedPosts.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {title: title, content: content};
    this.posts.push(post);
    this.updatedPosts.next([...this.posts]);
  }
}
