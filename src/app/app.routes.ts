import { Routes } from '@angular/router';
import { Hello } from './hello/hello';
import { TodoList } from './todo-list/todo-list';

export const routes: Routes = [
  {
    path: 'hello',
    children: [
      { path: '', component: Hello },
      { path: ':name', component: Hello },
    ],
  },
  { path: 'todo', component: TodoList },
];
