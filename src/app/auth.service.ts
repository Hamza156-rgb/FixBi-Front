import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './_models';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  roleAs:any = '';
  isLogin = false;
  private loggedIn = new BehaviorSubject<boolean>(localStorage.getItem("isLoggedIn") === "true");
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  constructor(private router: Router) { }
  login(user: User) {
    if (user.email !== '' && user.password !== '') {
      this.isLogin = true;
      this.roleAs = localStorage.getItem('user_type');
      console.log(this.roleAs);
      localStorage.setItem("isLoggedIn", "true");
      if(this.roleAs == '2'){
        localStorage.setItem('ROLE', 'customer');
      }
      else if(this.roleAs == '3' || this.roleAs == '4'){
        localStorage.setItem('ROLE', 'professional');
      }
      this.loggedIn.next(true);
      window.location.reload();
    }
  }
  sociallogin(username:any,password:any) {
    if (username !== '' && password !== '') {
      this.isLogin = true;
      this.roleAs = localStorage.getItem('user_type');
      localStorage.setItem("isLoggedIn", "true");
      if(this.roleAs == '2'){
        localStorage.setItem('ROLE', 'customer');
      }
      else if(this.roleAs == '3' || this.roleAs == '4'){
        localStorage.setItem('ROLE', 'professional');
      }
      this.loggedIn.next(true);
      this.router.navigate(['/about']);
    }
  }


  getRole() {
    this.roleAs = localStorage.getItem('ROLE');
    return this.roleAs;
  }






  logout() {
    this.loggedIn.next(false);
   // this.router.navigate(['']);
    this.isLogin = false;
    this.roleAs = '';
    localStorage.clear();
    localStorage.removeItem('ROLE');
    window.location.reload();
  }

}
