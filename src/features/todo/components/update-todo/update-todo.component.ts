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
export default class UpdateTodoComponent implements OnInit {
  id = input.required<string>();
  private todoService = inject(TodoService);
  private router = inject(Router);
  updateForm = new FormGroup({
    userId: new FormControl(),
    id: new FormControl(),
    title: new FormControl(''),
    completed: new FormControl(false)
  });
  ngOnInit() {
    this.todoService.getTodoById(this.id()).subscribe(todo => {
      this.updateForm.setValue(todo);
    });
  }
  onSubmit() {
    this.todoService.updateTodoById(this.id(), this.updateForm.value as Todo).subscribe({
      complete: () => this.router.navigate(['/todo'])
    });
  }
}
