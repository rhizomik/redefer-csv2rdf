import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  private loginForm: FormGroup;
  private emptyForm = false;
  private error = false;

  constructor(private fb: FormBuilder,
              private titleService: Title,
              private router: Router,
              private authService: AuthenticationService) { }

  ngOnInit() {
    this.titleService.setTitle("RDFTransformer - Login")
    this.loginForm = this.fb.group({
      userID: '',
      password: '',
    })
  }

  onSubmit() {
    if(this.loginForm.value.userID === "" || this.loginForm.value.password === "") {
      this.emptyForm = true;
    } else {
      this.emptyForm = false;
      this.error = false;
      this.authService.login(this.loginForm.value.userID, this.loginForm.value.password)
        .subscribe( user => {
          this.authService.storeCurrentUser(user)
          console.log(user);
          this.router.navigate(['/']);
        }, () => {
          this.error = true;
        })
    }
  }
}
