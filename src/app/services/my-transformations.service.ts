import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../authentication/User';
import { RdfRef } from '../models/RdfRef';
import { Observable } from 'rxjs';
import { FileRef } from '../models/FileRef';
import { FilesList } from '../models/FileList';

@Injectable({
  providedIn: 'root'
})
export class MyTransformationsService {

  private url = 'http://localhost:8080/api';

  constructor(private authenticationService: AuthenticationService,
              private http: HttpClient,
              ) { }

  getAllTransformations(): Observable<any> {
    let user = this.authenticationService.getCurrentUser();
    const authorization = this.authenticationService.generateAuthorization(user.username, user.password);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: authorization
      })
    };
    return this.http.get(this.url + '/get-all-transformations', httpOptions);
  }


  getRequestedFiles(fileName: string) {
    let user = this.authenticationService.getCurrentUser();
    const authorization = this.authenticationService.generateAuthorization(user.username, user.password);
      const requestOptions = {
        headers: new HttpHeaders( {Authorization: authorization})
      }
    const formData = new FormData();
    formData.append('requestedFile', fileName);

    return this.http.post(this.url + '/download-transformations', formData, requestOptions);
  }

  getEditInfo(user: User, fileName: string) {
    const authorization = this.authenticationService.generateAuthorization(user.username, user.password);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: authorization
      })
    };
    return this.http.get(this.url + '/get-request/' + fileName, httpOptions);
  }

}
