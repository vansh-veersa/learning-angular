import { Routes } from '@angular/router';
import { Hello } from './hello/hello';

export const routes: Routes = [
  {
    path:"",
    redirectTo:"github",
    pathMatch: 'full',
  },
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
  {
    path: 'github',
    loadChildren: () =>
      import('./github-explorer/github-explorer-module').then((m) => m.GithubExplorerModule),
  },
  
];
