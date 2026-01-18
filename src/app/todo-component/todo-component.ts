import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCheckCircle, heroClock, heroUsers } from '@ng-icons/heroicons/outline';
import { TodoService, TodoStatusEnum } from './todo-service';

@Component({
  selector: 'app-todo-component',
  imports: [CommonModule, FormsModule, DatePipe, NgIcon],
  templateUrl: './todo-component.html',
  styleUrls: ['./todo-component.css'],
  standalone: true,
  viewProviders: [provideIcons({ heroUsers, heroCheckCircle, heroClock })],
})
export class TodoComponent {
  private readonly todoService = inject(TodoService);
  TodoStatusEnum = TodoStatusEnum;

  todos = this.todoService.todos;

  // local ui state
  id: number = 0;
  title: string = '';
  description: string = '';

  addTodo() {
    this.todoService.addTodo({ title: this.title, description: this.description });
  }

  updateTodo(id: number) {
    this.todoService.updateTodo(id, { title: this.title, description: this.description });
  }

  removeTodo(id: number) {
    this.todoService.removeTodo(id);
  }

  markToDoDone(id: number) {
    console.log(1);
    this.todoService.updateTodo(id, { status: TodoStatusEnum.DONE });
  }

  markToDoPostpone(id: number) {
    this.todoService.updateTodo(id, { status: TodoStatusEnum.POSTPONE });
  }
}
