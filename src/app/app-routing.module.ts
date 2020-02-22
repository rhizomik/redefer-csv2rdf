import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RdfEditorComponent } from './rdf-editor/rdf-editor.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterComponent } from './register/register.component';
import { MyTransformationsComponent } from './my-transformations/my-transformations.component';


const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'editor', component: RdfEditorComponent },
  { path: 'login', component: LoginFormComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'my-transformations', component: MyTransformationsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
