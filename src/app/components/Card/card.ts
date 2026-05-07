import {
  Component,
  EventEmitter,
  Input,
  Inject,
  Output,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import { Task } from '../../types';
import { InputForm } from '../InputForm/inputForm';

import { TaskService } from '../../services/taskservice';
@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  styleUrl: './card.css',
  imports: [InputForm],
})
export class Card {
  @Input() task = new Task();

  priorityColor: any = {
    Low: '#d1e7dd',
    Medium: '#fff3cd',
    High: '#f8d7da',
  };

  // make a copy of the task
  Updatedtask: any;

  ngOnInit() {
    this.Updatedtask = { ...this.task };
  }
  taskService = inject(TaskService);
  @Output() changeTasks = new EventEmitter<'change'>();
  updateFun() {
    this.task = { ...this.Updatedtask };
    // console.log(this.task);
    this.taskService.updateTask(this.task).subscribe(() => {
      // console.log('done');
    });
  }

  doneFun() {
    this.task.status = 'Done';
    this.taskService.updateTask(this.task).subscribe(() => {
      // console.log('done');
    });
  }
  deleteFun() {
    this.taskService.deleteTask(String(this.task.id)).subscribe(() => {
      // console.log('done');
    });
  }
}
