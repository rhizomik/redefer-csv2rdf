import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { User } from '../authentication/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private registerForm: FormGroup;
  private emptyForm = false;

  constructor(private fb: FormBuilder,
              private titleService: Title,
              private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle("RDFTransformer - Register")
    this.registerForm = this.fb.group({
      userID: '',
      email: '',
      password: '',
    })
  }
  
  onSubmit() {
    let user = new User();
    user.username = this.registerForm.value.userID;
    user.email = this.registerForm.value.email;
    user.password = this.registerForm.value.password;
    
    if(this.registerForm.value.username === null || this.registerForm.value.password === null || this.registerForm.value.email === null) {
      this.emptyForm = true;
    } else {
      this.emptyForm = false;

      // TODO SERVICE CALL
      this.router.navigate(['/login']);
    }
  
  }

}
