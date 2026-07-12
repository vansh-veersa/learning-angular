import { Routes } from '@angular/router';
import { Hello } from './hello/hello';

export const routes: Routes = [
  {
    path: 'hello',
    children: [
      { path: '', component: Hello },
      { path: ':name', component: Hello },
    ],
  },
  {
    path: 'todo',
    loadChildren: () =>
      import('./todo/todo-module').then((m) => m.TodoModule),
  },
];
