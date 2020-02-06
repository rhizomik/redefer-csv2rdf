import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  private loginForm: FormGroup;
  private emptyForm = false;

  constructor(private fb: FormBuilder,
              private titleService: Title,
              private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle("RDFTransformer - Login")
    this.loginForm = this.fb.group({
      userID: '',
      password: '',
    })
  }

  onSubmit() {
    if(this.loginForm.value.userID === null || this.loginForm.value.password === null) {
      this.emptyForm = true;
    } else {
      this.emptyForm = false;

      // TODO SERVICE CALL
      this.router.navigate(['/']);
    }
  }

}
