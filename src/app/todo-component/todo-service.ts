import { Injectable, signal } from '@angular/core';

export enum TodoStatusEnum {
  PENDING = 'PENDING',
  DONE = 'DONE',
  POSTPONE = 'POSTPONE',
}

export interface IToDo {
  id: number;
  title: string;
  description: string;
  status: TodoStatusEnum;
  createdOn: Date;
  updatedOn: Date;
}

export interface IToDoCreateDto {
  title: string;
  description: string;
}

export interface ITodoUpdateDto extends Partial<IToDoCreateDto> {
  status?: TodoStatusEnum;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly _todos = signal<IToDo[]>([]);

  readonly todos = this._todos.asReadonly();

  addTodo(todo: IToDoCreateDto) {
    this._todos.update((todos) => [
      ...todos,
      {
        ...todo,
        id: Date.now(),
        createdOn: new Date(),
        updatedOn: new Date(),
        status: TodoStatusEnum.PENDING,
      },
    ]);
  }

  updateTodo(id: number, toDoUpdateDto: ITodoUpdateDto) {
    this._todos.update((todos) =>
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              ...toDoUpdateDto,
              updatedOn: new Date(),
            }
          : todo,
      ),
    );
  }

  removeTodo(id: number) {
    this._todos.update((todos) => todos.filter((todo) => todo.id !== id));
  }

  readToDo(filter: Record<keyof IToDo, any>) {
    return this.todos().filter((todo) =>
      Object.entries(filter).every(([key, value]) => todo[key as keyof IToDo] === value),
    );
  }
}
