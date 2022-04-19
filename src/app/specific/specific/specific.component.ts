import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as userActions from '../../users/state/users.actions';

@Component({
  selector: 'my-notes-app-specific',
  templateUrl: './specific.component.html',
  styleUrls: ['./specific.component.css']
})
export class SpecificComponent implements OnInit {

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.store.dispatch(userActions.accessTokenUpdated({ accessToken: null }));
    this.store.dispatch(userActions.refreshTokenUpdated({ refreshToken: null }));
    this.store.dispatch(userActions.loggedUserUpdated({ loggedUser: null }));
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['']);
  }

}
