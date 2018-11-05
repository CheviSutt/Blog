import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PostAddComponent } from './posts/post-createBlog/post-add.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatExpansionModule, MatInputModule, MatToolbarModule } from '@angular/material';
import { HeadComponent } from './head/head.component';
import { PostCurrPostsComponent } from './posts/post-currPosts/post-currPosts.component';
import { PostsService } from './posts/posts.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    PostAddComponent,
    PostCurrPostsComponent,
    HeadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule
  ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
