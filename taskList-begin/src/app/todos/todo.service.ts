import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Observable, catchError, of, switchMap, tap } from 'rxjs';
import { ToDo } from './todo';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly todoUrl =
    'https://jsonplaceholder.typicode.com/todos?userId=';
  // Inject the HttpClient service
  http = inject(HttpClient);
  userService = inject(UserService);

  // When the selected user changes, get the user's tasks

  private readonly _userTasks$: Observable<ToDo[]> = toObservable(
    this.userService.selectedUserId
  ).pipe(
    switchMap((userId: number) => this.http.get<ToDo[]>(this.todoUrl + userId)),
    tap((toDoList: ToDo[]) => this.userTasks.set(toDoList))
  );

  private readonly _userTasks = toSignal(this._userTasks$, {
    initialValue: [] as ToDo[],
  });

  public userTasks = signal<ToDo[]>([]);
  // Mark the task completed

  public markTaskComplete = (task: ToDo) => {
    this.userTasks.mutate(() => (task.completed = true));
  };
}
