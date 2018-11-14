import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { PostCurrPostsComponent } from './posts/post-currPosts/post-currPosts.component';
import { PostAddComponent } from './posts/post-createBlog/post-add.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', component: PostCurrPostsComponent },
  { path: 'newPost', component: PostAddComponent },
  { path: 'edit/:postId', component: PostAddComponent }, // /:postId is Dynamic segment
  { path: 'login', component: LoginComponent },
  { path: 'signUp', component: SignUpComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
