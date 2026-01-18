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
    this.validateToDo(todo);

    const todoEntity: IToDo = {
      ...todo,
      id: Date.now(),
      createdOn: new Date(),
      updatedOn: new Date(),
      status: TodoStatusEnum.PENDING,
    };

    this._todos.update((todos) => [...todos, todoEntity]);
  }

  updateTodo(id: number, toDoUpdateDto: ITodoUpdateDto) {
    this.validateId(id);
    this.validateToDo(toDoUpdateDto);

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

  validateToDo(todo: Partial<IToDo>) {
    const keysToValidate: (keyof IToDo)[] = ['title', 'description'];

    if (todo['status'] && !Object.values(TodoStatusEnum).includes(todo['status'])) {
      throw new Error(`Todo Status should be from: ${Object.values(TodoStatusEnum).join(', ')}`);
    }

    for (const key of keysToValidate) {
      // we know from the interface that values for 'keysToValidate' are going to be string
      if (key in todo && (todo[key] as string)?.trim() === '') {
        throw new Error(`${key} cannot be empty.`);
      }
    }
  }

  validateId(id: number) {
    if (!(this.todos().filter((todo) => todo.id === id).length > 0)) {
      throw new Error(`Todo with id: ${id} does not exists. Please try with a valid id`);
    }
  }
}
