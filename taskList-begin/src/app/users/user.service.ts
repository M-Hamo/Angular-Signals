import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';

import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userUrl = 'https://jsonplaceholder.typicode.com/users';

  // Inject the HttpClient service
  http = inject(HttpClient);

  // Retrieve the users from the API using RxJS
  private readonly _usersList$: Observable<User[]> = this.http.get<User[]>(
    this.userUrl
  );
  // Expose the state as a signal

  public readonly usersList = toSignal(this._usersList$, {
    initialValue: [] as User[],
  });
  // Set the selected user

  public readonly selectedUserId = signal<number>(0);

  public selectUserIdHandler = (userId: number): void =>
    this.selectedUserId.set(userId);
}
