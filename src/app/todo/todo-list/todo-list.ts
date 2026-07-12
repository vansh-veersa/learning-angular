import { Component, inject } from '@angular/core';
import { TodoService } from '../todo-service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
  standalone: false,
})
export class TodoList {
  todoService = inject(TodoService);
  newTodo = '';
  addTodo() {
    const text = this.newTodo.trim();
    if (!text) return;
    this.todoService.addTodo(text);
    this.newTodo = '';
  }
}
