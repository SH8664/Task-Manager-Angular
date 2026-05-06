import { Component, EventEmitter, inject, Input, Output } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Task } from '../../types';
import { TaskService } from '../../services/taskservice';

@Component({
  selector: 'app-input-form',
  imports: [FormsModule],
  templateUrl: './inputForm.html',
  styleUrl: './inputForm.css',
})
export class InputForm {
  taskService = inject(TaskService);
  @Input() public taskObj = new Task();


  public addTask() {
    this.taskService.addTask(this.taskObj).subscribe((date) => {
      // console.log('task added');
      // console.log(date);
    });
    this.taskObj = new Task();
  }

  public updateTask(updateTask: Task) {
    this.taskService.updateTask(updateTask);
  }
  @Input() isUpdateForm: boolean = false;
}
