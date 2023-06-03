import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  // Inject the UserService (new in v14)
  userService = inject(UserService);

  // private readonly sideEffect = effect(() =>
  //   console.log(this.selectedUserId())
  // );

  // Variables that don't change value
  pageTitle = 'User List';

  // Expose the state as signals
  users = this.userService.usersList;

  selectedUserId = this.userService.selectedUserId;

  // Set the selected user

  public onSelectUser = (id: number): void =>
    this.userService.selectUserIdHandler(id);
}
