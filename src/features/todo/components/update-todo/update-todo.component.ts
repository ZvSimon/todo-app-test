import {Component, inject, input, OnInit} from '@angular/core';
import {TodoService} from '../../services/todo-service.service';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Todo} from '../../models/todo';
import {Router} from '@angular/router';

@Component({
  selector: 'app-update-todo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-todo.component.html',
  styleUrl: './update-todo.component.css'
})
export default class UpdateTodoComponent   implements OnInit{
  id = input.required<number>();
  private todoService = inject(TodoService);
  private router = inject(Router);
  updateForm = new FormGroup({
    userId: new FormControl(),
    id: new FormControl(),
    title: new FormControl(''),
    completed: new FormControl(false)
  });
  ngOnInit() {
    this.todoService.getTodoById(Number(this.id())).subscribe(todo => {
      if (todo) {
        this.updateForm.patchValue(todo);
      }
    });
  }
  onSubmit() {
    this.todoService.updateTodoById(Number(this.id()), this.updateForm.value as Todo).subscribe({
      complete: () => this.router.navigate(['/todo'])
    });
  }

}
