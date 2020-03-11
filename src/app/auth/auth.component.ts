import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public isAuth: boolean;
  private subscription: Subscription

  loginForm: FormGroup;

  get email() {
    return this.loginForm.get('adminData.email');
  }
  get password() {
    return this.loginForm.get('adminData.password');
  }

  constructor(private authService: AuthService) {
    this.isAuth = JSON.parse(localStorage.getItem('token'));

    this.subscription = this.authService.isAuthChanged
      .subscribe(
        (isAuth: boolean) => {
          this.isAuth = isAuth;
        }
      );
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      adminData: new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      })
    });
  }

  onSubmit() {
    const email = this.loginForm.value.adminData.email;
    const password = this.loginForm.value.adminData.password;
    this.authService.isLogin(email, password);
    this.loginForm.reset();
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
