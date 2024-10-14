import {Routes} from '@angular/router';

export const todoRoutes: Routes = [
  {path:'',loadComponent : () => import('../todo/components/todo-list/todo-list.component')},
  {path:'new',loadComponent:() => import('../todo/components/todo-add/todo-add.component')},
  {path:':id',loadComponent:() => import('../todo/components/todo-details/todo-details.component')}
]
