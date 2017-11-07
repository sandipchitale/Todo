import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'mddemo-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  title = '';

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTodos();
  }

  sansCompletedTodos(): Todo[] {
    return this.todos.filter(todo => !todo.completed);
  }

  zeroCompletedTodos(): boolean {
    if (this.todos) {
      return !this.todos.some(todo => todo.completed === true);
    }
    return false;
  }

  getTodos(): void {
    this.todoService
        .getTodos()
        .subscribe((todos) => {
          this.todos = todos;
        });
  }

  addTodo(): void {
    this.title = this.title.trim();
    if (!this.title) { return; }
    this.todoService.addTodo(this.title)
      .subscribe(todo => {
        this.getTodos();
        this.title = '';
      },
      this.handleError);
  }

  updateTodo(todo: Todo): void {
    this.todoService
        .updateTodo(todo)
        .subscribe(() => {
        },
        this.handleError);
  }

  removeCompleted(): void {
    this.todoService
      .removeCompleted()
      .subscribe(() => {
        this.getTodos();
      },
      this.handleError);
  }

  removeTodo(todo: Todo): void {
    this.todoService
        .removeTodo(todo.id)
        .subscribe(() => {
          this.getTodos();
        },
        this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
