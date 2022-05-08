import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import * as userSelector from '../../../users/state/users.selectors';
import * as userActions from '../../../users/state/users.actions';
import * as loaderActions from '../../loader/loader.actions';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { encrypt } from 'src/assets/cipher';

@Component({
  selector: 'my-notes-app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  userSelectorObservable = this.store.select(userSelector.loggedUser);
  form: FormGroup = new FormGroup({});
  subcriptions: Subscription[] = [];
  _id: string = '';

  constructor(private store: Store, private fb: FormBuilder, private userService: UsersService, private router: Router, private toastService: ToastService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
    this.userSelectorObservable.subscribe((user) => {
      this.form.patchValue({ firstName: user?.firstName, lastName: user?.lastName, image: user?.image, username: user?.username });
      this._id = user?._id || '';
    });
  }

  save(): void {
    this.store.dispatch(loaderActions.startLoading({ loadingName: 'UPDATE_USER' }));
    this.subcriptions.push(this.userService.changePassword(encrypt(this.form?.get('password')?.value), this._id).subscribe((response) => {
      this.store.dispatch(userActions.accessTokenUpdated({ accessToken: response.accessToken }));
      this.store.dispatch(userActions.refreshTokenUpdated({ refreshToken: response.refreshToken }));
      this.store.dispatch(userActions.loggedUserUpdated({ loggedUser: response.user }));
      localStorage.setItem('loggedUser', JSON.stringify(response.user));
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      this.store.dispatch(loaderActions.stopLoading({ loadingName: 'UPDATE_USER' }));
      this.toastService.show('Password updated successfully', { classname: 'bg-success text-light', delay: 3000, type: 'SUCCESS' });
      this.router.navigate(['specific']);
    }, (error) => {
      this.store.dispatch(loaderActions.stopLoading({ loadingName: 'UPDATE_USER' }));
      this.toastService.show('An error ocurred while performing your request', { classname: 'bg-danger text-light', delay: 3000, type: 'FAILURE' });
    }));
  }

  cancel(): void {

  }

}
