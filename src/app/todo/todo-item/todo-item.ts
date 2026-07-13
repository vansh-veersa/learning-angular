import { Component, input, Output,EventEmitter, output } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.scss',
  standalone: false,
})
export class TodoItem {
  todo = input.required<Todo>();
  toggled = output<number>();
  // deleted = output<number>();
  @Output() deleted = new EventEmitter<number>();
  toggle() {
    this.toggled.emit(this.todo().id);
  }
  remove() {
    this.deleted.emit(this.todo().id);
  }
}
