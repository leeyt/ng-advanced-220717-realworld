import { UserLoginInfo } from './../interfaces/login-info';
import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  };

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    this.loginService
      .login(this.user)
      .subscribe({
        next: userInfo => {
          localStorage.setItem('token', userInfo.user.token);
          this.router.navigate(['/']);
        },
        error: (error: HttpErrorResponse) => {
          alert(error.error.body[0]);
        }
      });

  }

}
