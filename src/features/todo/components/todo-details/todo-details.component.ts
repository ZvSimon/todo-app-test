import {Component, inject, input, OnInit} from '@angular/core';
import {TodoService} from '../../services/todo-service.service';
import {Observable, Subscription} from 'rxjs';
import {Todo} from '../../models/todo';
import {AsyncPipe} from '@angular/common';
import {toObservable} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-todo-details',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.css'
})
export default class TodoDetailsComponent  implements OnInit{
  id = input.required<number>();
  private todosService = inject(TodoService)
  public displayTodoById$ !: Observable<Todo |undefined>

  public ngOnInit() {
    this.displayTodoById$ = this.todosService.getTodoById(Number(this.id()))
  }
}
