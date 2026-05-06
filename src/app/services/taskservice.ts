import { inject, Injectable, signal } from '@angular/core';
import { Task } from '../types';
import { HttpClient } from '@angular/common/http';
import { Subject, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  http = inject(HttpClient);
  baseURL = 'http://localhost:3000/tasks';
  private refreshNeeded$ = new Subject<void>();
  get refreshNeeded() {
    return this.refreshNeeded$;
  }

  addTask(task: Task) {
    return this.http.post(this.baseURL, task).pipe(tap(() => this.refreshNeeded$.next()));
  }

  updateTask(updatedTask: Task) {
    return this.http
      .put(`${this.baseURL}/${updatedTask.id}`, updatedTask)
      .pipe(tap(() => this.refreshNeeded$.next()));
  }

  deleteTask(id: string) {
    return this.http.delete(this.baseURL + '/' + id).pipe(tap(() => this.refreshNeeded$.next()));
  }

  getTasks() {
    return this.http.get<Task[]>(this.baseURL).pipe(tap(() => this.refreshNeeded$.next()));
  }

  getdoneTasks() {
    return this.http
      .get<Task[]>(`${this.baseURL}?status:eq=Done`)
      .pipe(tap(() => this.refreshNeeded$.next()));
  }
  getundoneTasks() {
    return this.http
      .get<Task[]>(`${this.baseURL}?status:eq=Not Done`)
      .pipe(tap(() => this.refreshNeeded$.next()));
  }
}
