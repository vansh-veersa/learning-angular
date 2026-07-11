import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.scss',
})
export class TodoItem {
  todo = input.required<Todo>();
  toggled = output<number>();
  deleted = output<number>();
  toggle(){
    this.toggled.emit(this.todo().id)
  }
  remove(){
    this.deleted.emit(this.todo().id)
  }
}
