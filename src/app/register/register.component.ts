import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { User } from '../authentication/User';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private registerForm: FormGroup;
  private emptyForm = false;
  private error = false;
  private successfull = false;

  constructor(private fb: FormBuilder,
              private titleService: Title,
              private router: Router,
              private authService: AuthenticationService) { }

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
 
    if(this.registerForm.value.username === "" || this.registerForm.value.password === "" || this.registerForm.value.email === "") {
      this.emptyForm = true;
    } else {
      this.emptyForm = false;
      this.error = false;
      this.authService.register(user).subscribe(data => {
        this.successfull = true;
        setTimeout( () => {}, 1000)  //no funciona
        this.router.navigate(['/login']);
      }),() =>{
        this.error = true;
      }
      
    }
  
  }

}
