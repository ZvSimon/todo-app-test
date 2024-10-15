import {Component, inject, OnInit} from '@angular/core';
import {TodoService} from '../../services/todo-service.service';
import {AsyncPipe} from '@angular/common';
import {combineLatest, combineLatestWith, filter, map, Observable, startWith, Subject, switchMap} from 'rxjs';
import {Todo} from '../../models/todo';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {NavigationEnd, Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, RouterLink],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export default class TodoListComponent {
  private todoService = inject(TodoService)
  search = new FormControl('')
  check = new FormControl(false)
  private refresh$$ = new Subject<void>();
  public displayAllTodos$: Observable<Todo[]> = this.refresh$$.pipe(
    startWith(null),
    switchMap(() => this.todoService.getAllTodo()),
    combineLatestWith(this.search.valueChanges.pipe(startWith(this.search.value)),this.check.valueChanges.pipe(startWith(this.check.value))),
    map(([todos, title,checkbox]) => todos.filter(todo =>
        todo.title.toLowerCase().includes((title || '').toLowerCase()) &&
        (checkbox ? todo.completed: !todo.completed)
      )
    )
  );

  onDelete(id: number) {
    this.todoService.deleteTodobyId(id).subscribe(() => {
      this.refresh$$.next();
    })
  }

}
