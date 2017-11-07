import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Imports for loading & configuring the in-memory web api
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryTodosService } from './todo-in-memory-todos.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule,
         MatIconModule,
         MatCardModule,
         MatListModule,
         MatCheckboxModule,
         MatButtonModule,
         MatInputModule,
         MatSlideToggleModule} from '@angular/material';

import { TodoComponent } from './todo.component';
import { TodoListComponent } from './todo-list.component';
import { TodoService } from './todo.service';

@NgModule({
  declarations: [
    TodoComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryTodosService),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatSlideToggleModule
  ],
  providers: [TodoService],
  bootstrap: [TodoComponent]
})
export class TodoModule { }
