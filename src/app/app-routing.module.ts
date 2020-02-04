import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RdfEditorComponent } from './rdf-editor/rdf-editor.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginFormComponent } from './login-form/login-form.component';



const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'editor', component: RdfEditorComponent },
  { path: 'login', component: LoginFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
