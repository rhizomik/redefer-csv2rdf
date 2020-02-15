import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../authentication/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthenticationService,
              private route: Router) { }

  ngOnInit() {
  }

  logout(): void {
    this.authService.logout();
    this.route.navigate(['/']);
  }

  getCurrentUserName(): string {
    return this.authService.getCurrentUser().username;
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getUser(): User {
    return this.authService.getCurrentUser();
  }

  isUserInRole(role: string): boolean {
    return this.authService.isUserInRole(role);
  }

  getCurrentUserId(): string {
    return this.authService.getCurrentUser().username;
  }

}
