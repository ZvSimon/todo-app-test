import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Todo} from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService{
  private httpClient = inject(HttpClient)
  private  url = 'https://jsonplaceholder.typicode.com/todos'

  getAllTodo() : Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.url).pipe(map(tods => tods.slice(0,10))
    );
  }
  getTodoById(id:string){
    return this.httpClient.get<Todo>(`${this.url}/${id}`)
  }

  deleteTodoById (id:string) : Observable<Todo>{
    return this.httpClient.delete<Todo>(`${this.url}/${id}`)
  }
  createTodo(todo : Todo) : Observable<Todo>{
    return this.httpClient.post<Todo>(this.url,todo)
  }
}
