import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UsersService } from './services/users.service';
import * as userActions from './modules/users/state/users.actions';
import * as loaderSelectors from './modules/specific/loader/loader.selectors';
import { Subscription } from 'rxjs';
import { AppState } from './state/app-state';

@Component({
  selector: 'my-notes-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  overlayEnabled: boolean = false;
  loadersObservable = this.store.select(loaderSelectors.loadings);

  constructor(private store: Store<AppState>, private userService: UsersService) { }

  ngOnInit(): void {
    const userCredentials = this.userService.getUserCredentials();
    if (userCredentials) {
      this.store.dispatch(userActions.loggedUserUpdated({ loggedUser: userCredentials.user }));
      this.store.dispatch(userActions.accessTokenUpdated({ accessToken: userCredentials.accessToken }));
      this.store.dispatch(userActions.refreshTokenUpdated({ refreshToken: userCredentials.refreshToken }));
      this.subscriptions.push(this.userService.getUserImage(userCredentials.user._id || '').subscribe((image) => {
        this.store.dispatch(userActions.userImageUpdated({ image: image.image }));
      }));
    }
    this.subscriptions.push(this.loadersObservable.subscribe((loader) => {
      setTimeout(() => {
        this.overlayEnabled = !!loader;
      });
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

}
