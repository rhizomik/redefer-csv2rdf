import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { DragDropDirective } from './dragdrop.directive';
import { AppFileUploadComponent } from './app-file-upload/app-file-upload.component';
import { FileUploadService } from './services/file-upload.service';
import { RdfEditorComponent } from './rdf-editor/rdf-editor.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
    AppFileUploadComponent,
    DragDropDirective,
    RdfEditorComponent,
    HomepageComponent,
    LoginFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    FileUploadService,
    Title,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
