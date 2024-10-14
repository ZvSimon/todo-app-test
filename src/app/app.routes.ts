import { Routes } from '@angular/router';
import {AppComponent} from './app.component';

export const routes: Routes = [
  {
    path:'todo',loadChildren:()=> import('../features/todo/todo.routes').then(r => r.todoRoutes)
  }
];
