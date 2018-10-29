import { Post } from './blog-post.model';
import { Injectable } from '@angular/core'; // getting an error
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'}) // applies service to the root, you can also import and providers=postsServices in app.module
export class PostsService {
  private posts: Post[] = [];
  private updatedPosts = new Subject<Post[]>(); // Listener

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http.get<{ message: string, posts: Post[] }>('http://localhost:3000/posts')
      .subscribe(postData => {
        this.posts = postData.posts; // Setting posts variable to posts from server
        this.updatedPosts.next([...this.posts]);
      });
   // return [...this.posts]; // spread operator before backend added
  }

  getUpdatedPostsListener() {
    return this.updatedPosts.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content};
    this.http.post<{message: string}>('http://localhost:3000/posts', post)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.posts.push(post); // updates local post
        this.updatedPosts.next([...this.posts]);
      });
  }
}
