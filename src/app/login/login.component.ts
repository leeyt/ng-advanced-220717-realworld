import { UserLoginInfo } from './../interfaces/login-info';
import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs';

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

  redirectUrl: string = '';

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.pipe(
      map(paramMap => paramMap.get('redirect') || '')
    ).subscribe(url => {
      this.redirectUrl = url;
    });
  }

  login(): void {
    this.loginService
      .login(this.user)
      .subscribe({
        next: userInfo => {
          localStorage.setItem('token', userInfo.user.token);
          this.router.navigate(['/' + this.redirectUrl]);
        },
        error: (error: HttpErrorResponse) => {
          alert(error.error.body[0]);
        }
      });

  }

}
