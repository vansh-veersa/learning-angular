import { Routes } from '@angular/router';
import { Hello } from './hello/hello';
import { TodoList } from './todo-list/todo-list';

export const routes: Routes = [
    {path:"hello",component:Hello},
    {path:"todo",component:TodoList}
];
