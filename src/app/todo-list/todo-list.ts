import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoItem } from '../todo-item/todo-item';
import { TodoService } from '../services/todo-service';

@Component({
  selector: 'app-todo-list',
  imports: [FormsModule,TodoItem],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
  standalone:true
})
export class TodoList {
  todoService = inject(TodoService)
  newTodo = "";
  addTodo(){
    const text = this.newTodo.trim();
    if(!text)return;
    this.todoService.addTodo(text);
    this.newTodo = ""
  }
}
