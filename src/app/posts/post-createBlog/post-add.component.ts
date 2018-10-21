
import { Component } from '@angular/core';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html'
})
export class PostAddComponent {
  textEntered = '';
  newPost = 'Create Content';

  onAddPost() {
    this.newPost = this.textEntered;
  }
}
