import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RdfEditorComponent } from './rdf-editor/rdf-editor.component';
import { HomepageComponent } from './homepage/homepage.component';



const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'editor', component: RdfEditorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
