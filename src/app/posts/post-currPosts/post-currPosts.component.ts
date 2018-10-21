import { Component, Input } from '@angular/core';
import { Post } from '../blog-post.model';



@Component({
  selector: 'app-post-currPosts',
  templateUrl: './post-currPosts.component.html',
  styleUrls: ['./post-currPosts.component.css']
})

export class PostCurrPostsComponent {
  // posts = [
  //   {title: 'Test Post-1', content: '1: Here are some words to fill in text sjhf shfg hhgfd'},
  //   {title: 'Test Post-2', content: '2: Here are some words to fill in text sjhf shfg hhgfd'},
  //   {title: 'Test Post-3', content: '3: are some words to fill in text sjhf shfg hhgfd'}
  //   ];
  @Input() posts: Post[] = [];
}
