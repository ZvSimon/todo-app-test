import {Injectable} from '@angular/core';
import {catchError, Observable, of, tap, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {Todo} from '../models/todo';
import {MOCK_TODOS} from '../models/mock-todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
 private dataTodos = MOCK_TODOS;

 public getAllTodo() : Observable<Todo[]>{
   return of(this.dataTodos)
 }
  public getTodoById(id: number): Observable<Todo | undefined> {
    console.log('ID passé:', id);

    // Vérifiez si les données sont bien chargées
    if (!this.dataTodos || this.dataTodos.length === 0) {
      console.warn('Les données Todos ne sont pas encore disponibles.');
      return of(undefined); // Retourner un Observable vide si les données ne sont pas prêtes
    }

    return of(this.dataTodos).pipe(
      tap((todos) => console.log('Liste complète des todos:', todos)),
      map((todos) => todos.find((todo) => todo.id === id)),
      tap((result) => {
        if (result) {
          console.log('Todo trouvé:', result);
        } else {
          console.error(`Todo avec ID ${id} non trouvé`);
        }
      })
    );
  }

  public deleteTodobyId(id: number) {
    return of(this.dataTodos).pipe(
      map((todos) => {
        const index = todos.findIndex((todo) => todo.id === id);
        return index !== -1 ? todos.splice(index, 1)[0] : undefined;
      })
    );
  }

  public updateTodoById(id: number,todo : Todo){
    return of(this.dataTodos).pipe(
      map((todos) => {
        const index = todos.findIndex((todo) => todo.id === id);
        return index !== -1 ? todos.splice(index, 1, todo)[0] : undefined;
      })
    );
  }

  public addTodo (todo: Todo){
    return of(this.dataTodos).pipe(
      map((todos) => {
        todos.push(todo);
        return todo;
      })
    );
  }

}
