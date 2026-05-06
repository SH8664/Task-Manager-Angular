import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.html',
  styleUrl: './slider.css',
})
export class Slider {
  forwardTimer: any;
  backwardTimer: any;
  selected: number = 0;

  ImgPaths = [
    {
      id: 0,
      src: 'assets/1.jpg',
      color: 'red',
    },
    {
      id: 1,
      src: 'assets/2.jpg',
      color: 'green',
    },
    {
      id: 2,
      src: 'assets/3.jpg',
      color: 'blue',
    },
  ];

  clearTimers() {
    if (this.forwardTimer) clearInterval(this.forwardTimer);
    if (this.backwardTimer) clearInterval(this.backwardTimer);
  }
  forward() {
    this.clearTimers();
    this.forwardTimer = setInterval(() => {
      this.selected = (this.selected + 1) % this.ImgPaths.length;
    }, 2000);
  }
  backward() {
    this.clearTimers();
    this.backwardTimer = setInterval(() => {
      this.selected = (this.selected - 1 + this.ImgPaths.length) % this.ImgPaths.length;
    }, 2000);
  }
}
