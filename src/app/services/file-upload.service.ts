import { HttpClient, HttpHeaders, HttpEvent, HttpRequest, HttpParams } from '@angular/common/http';
import { OnInit, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class FileUploadService {

    private url = 'http://localhost:8080/upload';
  
    constructor(private http: HttpClient) {}
  
    
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

  }