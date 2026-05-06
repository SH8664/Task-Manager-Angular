import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { User } from '../../types';
import { UserService } from '../../services/userservice';
import { Router } from '@angular/router';

function noMatch(formGroup: AbstractControl): ValidationErrors | null {
  const password = formGroup.get('password')?.value;
  const confirm = formGroup.get('confirm')?.value;
  return password !== confirm ? { noMatch: true } : null;
}
@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  user = new User();
  router = inject(Router);
  usernameExists = false;
  emailExists = false;

  userService = inject(UserService);

  form = new FormGroup(
    {
      username: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$'),
      ]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirm: new FormControl('', [Validators.required, Validators.minLength(8)]),
    },
    {
      validators: [noMatch],
    },
  );

  handleSubmit(e: Event) {
    // e.preventDefault();
    // console.log(this.form);
    if (this.form.valid) {
      this.user.Email = this.form.get('email')?.value!;
      this.user.Password = this.form.get('password')?.value!;
      this.user.Username = this.form.get('username')?.value!;
      this.userService.getUserbyusername(String(this.user.Username)).subscribe((data) => {
        this.usernameExists = data.length > 0;
        if (!this.usernameExists) {
          this.userService.getUserbyemail(String(this.user.Email)).subscribe((data) => {
            this.emailExists = data.length > 0;
            if (!this.emailExists) {
              this.userService.addUser(this.user).subscribe((data) => console.log(data));
              localStorage.setItem('email', String(this.user.Email));
              localStorage.setItem('password', String(this.user.Password));
              localStorage.setItem('username', String(this.user.Username));
              this.router.navigate(['layout/home']);
            }
          });
        }
      });
    }
    // let pass = this.form.get('password');
    // console.log(pass);
  }
}
