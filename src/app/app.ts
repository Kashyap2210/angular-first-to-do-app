import { Component } from '@angular/core';
import { TodoComponent } from './todo-component/todo-component';

@Component({
  selector: 'app-root',
  imports: [TodoComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,
})
export class App {}
