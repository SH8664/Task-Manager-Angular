import { Component, Output, signal } from '@angular/core';
import { Task } from '../../types';
import { Tabs } from '../../components/Tabs/tabs';
enum colors {
  red,
  green,
  blue,
}
enum ImgPaths {
  'assets/1.jpg',
  'assets/2.jpg',
  'assets/3.jpg',
}
@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected readonly title = signal('Task-Manager');
  // ImgPaths: String[] = ['assets/1.jpg', 'assets/2.jpg', 'assets/3.jpg'];
  // selected: number = 0;
  // color: string = colors[this.selected].toString();
  // Path: string = ImgPaths[this.selected].toString();

  // forwardTimer: any;
  // backwardTimer: any;
  // public changeImage(event: Event): void {
  //   if (this.forwardTimer) clearInterval(this.forwardTimer);
  //   if (this.backwardTimer) clearInterval(this.backwardTimer);

  //   var target = event.target as HTMLElement;

  //   switch (target.id) {
  //     case '0':
  //       this.selected = 0;
  //       break;
  //     case '1':
  //       this.selected = 1;
  //       break;
  //     case '2':
  //       this.selected = 2;
  //       break;
  //     case 'prev':
  //       this.selected = (this.selected - 1 + 3) % 3;
  //       console.log(this.selected);

  //       break;
  //     case 'next':
  //       this.selected = (this.selected + 1) % 3;
  //       break;

  //     case 'slideshowForward':
  //       this.forwardTimer = setInterval(() => {
  //         this.selected = (this.selected + 1) % 3;
  //         console.log(this.selected);
  //       }, 1000);
  //       break;
  //     case 'slideshowBackward':
  //       this.backwardTimer = setInterval(() => {
  //         this.selected = (this.selected - 1 + 3) % 3;
  //       }, 1000);
  //       break;
  //   }
  //   return;
  // }

  tasks: Task[] = [];

  getUpdatedTasks(updatedtasks: Task[]) {
    this.tasks = new Array(...updatedtasks);
  }
}
