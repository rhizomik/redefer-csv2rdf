import { HttpClient, HttpHeaders, HttpEvent, HttpRequest, HttpParams } from '@angular/common/http';
import { OnInit, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RDFRequest } from '../models/RDFRequest';
import { User } from '../authentication/User';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class FileUploadService {

    private url = 'http://localhost:8080/api';
  
    constructor(private http: HttpClient,
                private authenticationService: AuthenticationService) {}
  
    
    postFileToApi(file: File): Observable<any> {
      const formdata: FormData = new FormData();
      const headers = { 
      }
  
      const requestOptions = {
        headers: new HttpHeaders(headers),
        responseType: 'text' as 'json'
      }

      formdata.append('file', file);
      
      const req = new HttpRequest('POST', this.url, formdata);
      return this.http.post(this.url, formdata, requestOptions);
    }

    postRDFDataRequest(rdfRequest: RDFRequest, file: File) {
      const headers = {};
      const formData = new FormData();
      formData.append('file', file);
      formData.append('RDFRequest', JSON.stringify(rdfRequest));

      const requestOptions = {
        headers: new HttpHeaders(headers),
        responseType: rdfRequest.format as 'json', 
      }
      return this.http.post(this.url + '/transform', formData, requestOptions);
    }

    postRDFDataUserRequest(user: User, rdfRequest: RDFRequest, file: File) {
      const authorization = this.authenticationService.generateAuthorization(user.username, user.password);
      const requestOptions = {
        headers: new HttpHeaders( {Authorization: authorization}),
        responseType: rdfRequest.format as 'json', 
      }
      const formData = new FormData();
      formData.append('file', file);
      formData.append('RDFRequest', JSON.stringify(rdfRequest));
      formData.append('User', JSON.stringify(user));

      return this.http.post(this.url + '/transform-user', formData, requestOptions);
  }

}
