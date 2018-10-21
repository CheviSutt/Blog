
import { Component } from '@angular/core';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent {
  textEntered = '';
  newPost = 'Create Content';

  onAddPost() {
    this.newPost = this.textEntered;
  }
}
