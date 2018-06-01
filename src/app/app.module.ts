import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { PostTileComponent } from './post-tile/post-tile.component';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { CategoriaComponent } from './categoria/categoria.component';
import { TagComponent } from './tag/tag.component';
import { ArraySortPipe } from './pipes/sort.pipe';
import { CreatePostComponent } from './create-post/create-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowPostComponent } from './show-post/show-post.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { filterVisibilePipe } from './pipes/filterVisibile.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PostTileComponent,
    CategoriaComponent,
    TagComponent,
    ArraySortPipe,
    filterVisibilePipe,
    CreatePostComponent,
    ShowPostComponent,
    RegistrazioneComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    HttpService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
