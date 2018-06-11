import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { TagComponent } from './tag/tag.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ShowPostComponent } from './show-post/show-post.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'crea-post', canActivate: [AuthGuardAdmin], component: CreatePostComponent},
  {path: 'posts/:id', canActivate: [AuthGuard], component: ShowPostComponent},
  {path: 'categorie/:id', component: CategoriaComponent},
  {path: 'tags/:id', component: TagComponent},
  {path: 'registrazione', component: RegistrazioneComponent},
  {path: 'admin', canActivate: [AuthGuardAdmin], component: AdminPageComponent},
  { path: 'not-found', component: ErrorPageComponent, data: {message: '404 Page not found!'} },
  { path: 'forbidden', component: ErrorPageComponent, data: {message: 'Forbidden access, please log in!'} },
  { path: 'forbidden-admin', component: ErrorPageComponent, data: {message: 'Only administrators can access this page!'} },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
