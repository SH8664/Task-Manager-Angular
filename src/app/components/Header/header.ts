import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
  imports: [RouterLink],
})
export class Header {
  color = 'gray';

  cursor = 'pointer';
  @Output() activeContentEvent = new EventEmitter<string>();
  username = '';
  ngOnInit() {
    this.username = localStorage.getItem('username') || '';
  }
}
