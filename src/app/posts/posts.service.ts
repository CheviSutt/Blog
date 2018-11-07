import { Post } from './blog-post.model';
import { Injectable } from '@angular/core'; // getting an error
import { Subject } from 'rxjs/Subject';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'}) // applies service to the root, you can also import and providers=postsServices in app.module
export class PostsService {
  private posts: Post[] = [];
  private updatedPosts = new Subject<Post[]>(); // Listener

  constructor(private http: HttpClient) {}

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
    return {...this.posts.find(p => p.id === id)}; // ... is a Spread operator | used in post-add.component
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
      });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content };
    this.http.put('http://localhost:3000/posts/' + id, post) // put method from app.js - app.put(/posts/:id)
      .subscribe(response => console.log(response));
  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/posts/' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.updatedPosts.next([...this.posts]);
      });
  }

}
