import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryTodosService implements InMemoryDbService {
  createDb() {
    const todos = [
      { id: 0, completed: false, title: 'Get Milk' },
      { id: 1, completed: false, title: 'Get Bread' },
      { id: 2, completed: false, title: 'Get Sugar' },
      { id: 3, completed: false, title: 'Get Silk' }
    ];
    return {todos};
  }
}
