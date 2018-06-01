import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { TagComponent } from './tag/tag.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ShowPostComponent } from './show-post/show-post.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'crea-post', component: CreatePostComponent},
  {path: 'posts/:id', component: ShowPostComponent},
  {path: 'categorie/:id', component: CategoriaComponent},
  {path: 'tags/:id', component: TagComponent},
  {path: 'registrazione', component: RegistrazioneComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
