import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { List } from '../List/list';
import { Task } from '../../types';
import { TaskService } from '../../services/taskservice';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.html',
  styleUrl: './tabs.css',
  imports: [List],
})
export class Tabs {
  activeTab: 'list' | 'notdone' | 'done' = 'list';
  taskService = inject(TaskService);
  tasks: Task[] = [];

  ngOnInit() {
    this.loadTasks();
    this.taskService.refreshNeeded.subscribe(() => {
      this.loadTasks();
    });
  }

  loadTasks() {
    if (this.activeTab == 'list')
      this.taskService.getTasks().subscribe((data: any) => {
        // console.log('list ', data);
        this.tasks = data;
      });
    else if (this.activeTab == 'notdone')
      this.taskService.getundoneTasks().subscribe((data: any) => {
        // console.log('not ', data);
        this.tasks = data;
      });
    else if (this.activeTab == 'done')
      this.taskService.getdoneTasks().subscribe((data: any) => {
        // console.log('done ', data);
        this.tasks = data;
      });
  }
}
