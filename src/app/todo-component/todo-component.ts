import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TodoService, TodoStatusEnum } from './todo-service';

@Component({
  selector: 'app-todo-component',
  imports: [CommonModule],
  templateUrl: './todo-component.html',
  styleUrls: ['./todo-component.css'],
  standalone: true,
})
export class TodoComponent {
  private readonly todoService = inject(TodoService);
  TodoStatusEnum = TodoStatusEnum;

  todos = this.todoService.todos;
}
