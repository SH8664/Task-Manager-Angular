import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../Header/header';
import { Footer } from '../footer/footr';
@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {}
