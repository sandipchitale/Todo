import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { Todo } from './todo';

@Injectable()
export class TodoService {
  private todosUrl = 'api/todos';  // URL to web api
  private params = new HttpParams();

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl);
  }

  addTodo(title: string): Observable<Todo> {
    return this.http
      .post<Todo>(this.todosUrl, {title: title, completed: false} as Todo);
  }

  updateTodo(todo: Todo): Observable<string> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http
      .put(url, todo, {responseType: 'text' as 'text' });
  }

  removeTodo(id: number): Observable<string> {
    const url = `${this.todosUrl}/${id}`;
    return this.http.delete(url, {responseType: 'text' as 'text' });
  }

  removeCompleted(): Observable<string> {
    return this.http.delete(this.todosUrl, {responseType: 'text' as 'text' });
  }

}
