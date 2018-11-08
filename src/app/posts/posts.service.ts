import { Post } from './blog-post.model';
import { Injectable } from '@angular/core'; // getting an error
import { Subject } from 'rxjs/Subject';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'}) // applies service to the root, you can also import and providers=postsServices in app.module
export class PostsService {
  private posts: Post[] = [];
  private updatedPosts = new Subject<Post[]>(); // Listener | postsUpdated??!!

  constructor(private http: HttpClient, private router: Router) {} // private router: is used in addPost() & updatePost

  getPosts() {
    this.http.get<{ message: string, posts: any }>('http://localhost:3000/posts')
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return { // every element in array will be converted to object
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe( reconfiguredPosts => { // reconfiguredPosts is result of map operation above
        this.posts = reconfiguredPosts; // Setting posts variable to posts from server
        this.updatedPosts.next([...this.posts]);
      });
   // return [...this.posts]; // spread operator before backend added
  }

  getUpdatedPostsListener() {
    return this.updatedPosts.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{_id: string, title: string, content: string}>(
      'http://localhost:3000/posts/' + id); // pulling from post-add.component
    // return {...this.posts.find(p => p.id === id)}; // ... is a Spread operator | used in post-add.component
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http.post<{ message: string, postId: string }>('http://localhost:3000/posts', post)
      .subscribe((responseData) => {
        // console.log(responseData.message);
        const id = responseData.postId;
        post.id = id; // id updated and stored to post variable below
        this.posts.push(post); // updates local post
        this.updatedPosts.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content };
    this.http.put('http://localhost:3000/posts/' + id, post) // http.put = put method from app.js - app.put(/posts/:id)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.updatedPosts.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/posts/' + postId) // http.delete = app.delete in app.js
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.updatedPosts.next([...this.posts]);
      });
  }

}
