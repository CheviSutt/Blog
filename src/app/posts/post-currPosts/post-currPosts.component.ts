import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../blog-post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-currPosts',
  templateUrl: './post-currPosts.component.html',
  styleUrls: ['./post-currPosts.component.css']
})

export class PostCurrPostsComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: 'Test Post-1', content: '1: Here are some words to fill in text'},
  //   {title: 'Test Post-2', content: '2: Here are some words to fill in text'},
  //   {title: 'Test Post-3', content: '3: are some words to fill in text'}
  //   ];
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {} // Looking for an instance of PostsService type,
  // Keyword: public, stores value of property in component^^

  ngOnInit() {
    this.postsService.getPosts();
   // this.posts = this.postsService.getPosts(); // Retrieves all the posts before backend
    this.postsSub = this.postsService.getUpdatedPostsListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  postDelete(postID: string) {
    this.postsService.deletePost(postID);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe(); // Prevents memory leak
  }
}
