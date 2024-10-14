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
  todoService = inject(TodoService)
  router = inject(Router);
  addTodo = new FormGroup({
    userId: new FormControl(),
    id: new FormControl(),
    title: new FormControl(''),
    completed: new FormControl(false)

  })

  onSubmit() {
    this.todoService.createTodo(this.addTodo.value as Todo).subscribe({
      complete:()=> this.router.navigate(['/todo'])
    })
  }
}
