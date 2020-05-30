import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../authentication/User';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
  private url = "https://rdf-transformer-api.herokuapp.com/api"

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<User> {
    const authorization = this.generateAuthorization(username, password);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: authorization
      })
    };
    return this.http.get(this.url + '/identity', httpOptions).pipe(
      map(data => {
        const user: User = new User(data);
        user.authorization = authorization;
        user.password = password;
        return user;
      })
    );
  }

  register(user: User): Observable<any> {
    const formdata: FormData = new FormData();
    const headers = { 
    }

    const requestOptions = {
      headers: new HttpHeaders(headers),
      responseType: 'text' as 'json'
    }

    formdata.append('username', user.username);
    formdata.append('password', user.password);
    formdata.append('email', user.email);
    formdata.append('passwordReset', "false");
    const req = new HttpRequest('POST', this.url + '/register', formdata);

    return this.http.post(this.url + '/register', formdata, requestOptions);
  }
  
  generateAuthorization(username: string, password: string): string {
    return `Basic ${btoa(`${username}:${password}`)}`;
  }

  storeCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  getCurrentUser(): User {
    return new User(JSON.parse(localStorage.getItem('currentUser')));
  }

  isUserInRole(role: string): boolean {
    const user: User = this.getCurrentUser();
    return user && user.authorities[0] &&
      user.authorities[0].authority === 'ROLE_' + role.toUpperCase();
  }
}
