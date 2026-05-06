import { Component } from '@angular/core';
import { Tabs } from '../../components/Tabs/tabs';

@Component({
  selector: 'app-tasks',
  imports: [Tabs],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {}
