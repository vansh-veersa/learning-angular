import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { TodoItem } from './todo-item/todo-item';
import { TodoList } from './todo-list/todo-list';
import { TodoService } from './todo-service';

const routes: Routes = [{ path: '', component: TodoList }];

@NgModule({
  declarations: [TodoItem, TodoList],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
  providers: [TodoService],
})
export class TodoModule {}
