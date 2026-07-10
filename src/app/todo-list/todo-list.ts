import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Todo{
  id:number;
  text:String;
  done:boolean
}

@Component({
  selector: 'app-todo-list',
  imports: [FormsModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
  standalone:true
})
export class TodoList {
  todos = signal<Todo[]>([])
  newTodo = "";
  noOfTodos = computed(()=>this.todos().length)
  noOfCompletedTodos = computed(()=>this.todos().reduce((total,todo)=>todo.done?total+1:total,0));
  addTodo(){
    const text = this.newTodo.trim();
    if(!text)return;
    this.todos.update((list) => [...list,{ id: Date.now(), text, done: false }])
    this.newTodo = ""
  }
  toggleTodo(id:number){
    this.todos.update(list=>list.map(item=>item.id===id?{...item, done:!item.done}:item))
  }
  removeTodo(id:number){
    this.todos.update(list=>list.filter(item=>item.id!==id))
  }
}
