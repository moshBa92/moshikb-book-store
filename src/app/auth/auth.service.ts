import { Router } from '@angular/router';
import { Admin } from './admin.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private admins: Admin[] = [
    new Admin('admin1@gmail.com', '123456'),
    new Admin('admin2@gmail.com', '456789')
  ]

  private isAuth: boolean = false;;
  isAuthChanged = new Subject<boolean>();

  constructor(private router: Router) {
    const retriveObject = JSON.parse(localStorage.getItem('token'));
    if (retriveObject) {
      this.isAuth = retriveObject;
    } else {
      this.isAuth = false;
    }
    this.isAuthChanged.next(this.isAuth);
  }

  getIsAuth() {
    return this.isAuth;
  }

  isAuthenticatedForAouthGuard() {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.isAuth)
        }, 10);
      })
    return promise;
  }

  isLogin(email: string, password: string) {
    for (let index in this.admins) {
      const adminMail = this.admins[index].email;
      const adminPassword = this.admins[index].password;
      if (email === adminMail && password === adminPassword && this.isAuth === false) {
        this.isAuth = true;
        localStorage.setItem('token', JSON.stringify(this.isAuth));
      }
    }
    localStorage.setItem('token', JSON.stringify(this.isAuth));
    this.isAuthChanged.next(this.isAuth);
    this.router.navigate(['/edit-book']);
  }

  Logout() {
    this.isAuth = false;
    localStorage.setItem('token', JSON.stringify(this.isAuth));
    this.isAuthChanged.next(this.isAuth);
    this.router.navigate(['/']);
  }
}
