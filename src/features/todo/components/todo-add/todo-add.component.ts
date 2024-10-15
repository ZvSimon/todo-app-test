import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Todo} from '../../models/todo';
import {TodoService} from '../../services/todo-service.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-todo-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './todo-add.component.html',
  styleUrl: './todo-add.component.css'
})
export default class TodoAddComponent {
  private todoService = inject(TodoService);
  private router = inject(Router)
  addTodoForm = new FormGroup({
    id: new FormControl(),
    title: new FormControl(''),
    completed: new FormControl(false)
  });

  onSubmit() {
    this.todoService.addTodo(this.addTodoForm.value as Todo).subscribe({
      complete: () => this.router.navigate(['/todo'])
    });
  }
}
