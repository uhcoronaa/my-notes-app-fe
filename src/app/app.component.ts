import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UsersService } from './services/users.service';
import * as userSelectors from './users/state/users.selectors';
import * as userActions from './users/state/users.actions';

@Component({
  selector: 'my-notes-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loggedUserObservable = this.store.select(userSelectors.loggedUser);

  constructor(private store: Store, private userService: UsersService){}

  ngOnInit(): void {
    const userCredentials = this.userService.getUserCredentials();
    if (userCredentials) {
      this.store.dispatch(userActions.loggedUserUpdated({ loggedUser: userCredentials.user }));
      this.store.dispatch(userActions.accessTokenUpdated({ accessToken: userCredentials.accessToken }));
      this.store.dispatch(userActions.refreshTokenUpdated({ refreshToken: userCredentials.refreshToken }));
    }
  }
}
