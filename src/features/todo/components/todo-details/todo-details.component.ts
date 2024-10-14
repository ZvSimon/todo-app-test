import {Component, inject, input, OnInit} from '@angular/core';
import {TodoService} from '../../services/todo-service.service';
import {Observable} from 'rxjs';
import {Todo} from '../../models/todo';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-todo-details',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.css'
})
export default class TodoDetailsComponent implements OnInit {
  id = input.required<string>();
  private todoService=inject(TodoService)
  displayTodoById$ !: Observable<Todo>
  ngOnInit() {
   this.displayTodoById$ =  this.todoService.getTodoById(this.id())
  }
}
