import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { User } from '../../types';
import { UserService } from '../../services/userservice';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
})
export class Login {
  user: User = new User();
  userService = inject(UserService);
  private router = inject(Router);
  invalidPassword = false;
  ngOnInit() {
    if (localStorage.getItem('email') != null && localStorage.getItem('password') != null) {
      this.router.navigate(['layout/home']);
    }
  }

  login(form: NgForm) {
    this.user.Email = form.controls?.['email']?.value!;
    this.user.Password = form.controls?.['password']?.value!;

    this.userService.getUserbyemail(String(this.user.Email)).subscribe((user) => {
      if (user.length > 0) {
        if (user[0].password == this.user.Password) {
          localStorage.setItem('email', String(this.user.Email));
          localStorage.setItem('password', String(this.user.Password));
          localStorage.setItem('username', String(user[0].username));
          console.log(this.invalidPassword);
          this.invalidPassword = false;
          this.router.navigate(['layout/home']);
        } else {
          this.invalidPassword = true;
        }
      } else {
        this.invalidPassword = true;
      }
    });
  }
}
