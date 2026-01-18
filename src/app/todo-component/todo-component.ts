import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroCheckCircle,
  heroClock,
  heroPencilSquare,
  heroTrash,
  heroUsers,
} from '@ng-icons/heroicons/outline';
import { TodoService, TodoStatusEnum } from './todo-service';

@Component({
  selector: 'app-todo-component',
  imports: [CommonModule, FormsModule, DatePipe, NgIcon],
  templateUrl: './todo-component.html',
  styleUrls: ['./todo-component.css'],
  standalone: true,
  viewProviders: [
    provideIcons({ heroUsers, heroCheckCircle, heroClock, heroTrash, heroPencilSquare }),
  ],
})
export class TodoComponent {
  private readonly todoService = inject(TodoService);
  TodoStatusEnum = TodoStatusEnum;

  todos = this.todoService.todos;

  //   If the data is not yet saved, it belongs to the component.
  // If the data is saved / shared / persisted, it belongs to the service.
  // local ui state
  title: string = '';
  description: string = '';

  // Edit UI state
  editingTodoId: number | null = null;
  editTitle = '';
  editDescription = '';

  addTodo() {
    this.todoService.addTodo({ title: this.title, description: this.description });
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

  startEdit(todo: { id: number; title: string; description: string }) {
    this.editingTodoId = todo.id;
    this.editTitle = todo.title;
    this.editDescription = todo.description;
  }

  cancelEdit() {
    this.editingTodoId = 0;
    this.editTitle = '';
    this.editDescription = '';
  }

  saveEdit(id: number) {
    this.todoService.updateTodo(id, {
      title: this.editTitle,
      description: this.editDescription,
    });
    this.cancelEdit();
  }
}
