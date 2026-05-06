import { inject, Injectable, signal } from '@angular/core';
import { Task, User } from '../types';
import { HttpClient } from '@angular/common/http';
import { Subject, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  baseURL = 'http://localhost:3000/users';

  addUser(user: User) {
    return this.http.post(this.baseURL, user);
  }
  getUserbyusername(username: string) {
    // ?status:eq=Not Done`
    return this.http.get<User[]>(`${this.baseURL}?username:eq=${username}`);
  }
  getUserbyemail(email: string) {
    return this.http.get<User[]>(`${this.baseURL}?email:eq=${email}`);
  }

  getUserbyPassword(password: string) {
    return this.http.get<User[]>(`${this.baseURL}?password:eq=${password}`);
  }
}
