import { ChangeDetectorRef, Component, computed, inject, Input, signal } from '@angular/core';
import { Task } from '../../types';
import { Card } from '../Card/card';
import { TaskService } from '../../services/taskservice';
@Component({
  selector: 'app-list',
  templateUrl: './list.html',
  styleUrl: './list.css',
  imports: [Card],
})
export class List {
  @Input() tasks: Task[] = [];
}
