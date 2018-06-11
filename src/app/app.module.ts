import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { PostTileComponent } from './post-tile/post-tile.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { TagComponent } from './tag/tag.component';
import { ArraySortPipe } from './pipes/sort.pipe';
import { CreatePostComponent } from './create-post/create-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowPostComponent } from './show-post/show-post.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { filterVisibilePipe } from './pipes/filterVisibile.pipe';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { filterUncheckedPipe } from './pipes/filterUnchecked.pipe';
import { CategoriaService } from './services/categoria.service';
import { CommentoService } from './services/commento.service';
import { TagService } from './services/tag.service';
import { UtilitiesService } from './services/utilities.service';
import { PostService } from './services/post.service';
import { HttpClientModule } from '@angular/common/http';
import { UtenteAndLoginService } from './services/utente-and-login.service';
import { BsDropdownModule, ModalModule, PaginationModule } from 'ngx-bootstrap';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';

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
    filterUncheckedPipe,
    CreatePostComponent,
    ShowPostComponent,
    RegistrazioneComponent,
    AdminPageComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [
    CategoriaService,
    CommentoService,
    UtenteAndLoginService,
    PostService,
    TagService,
    UtilitiesService,
    AuthGuard,
    AuthGuardAdmin
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
