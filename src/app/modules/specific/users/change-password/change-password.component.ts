import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import * as userSelector from '../../../users/state/users.selectors';
import * as userActions from '../../../users/state/users.actions';
import * as loaderActions from '../../loader/loader.actions';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import * as unsavedFormActions from '../../unsaved-forms/unsaved-forms.actions';
import { AppState } from 'src/app/state/app-state';

@Component({
  selector: 'my-notes-app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  userSelectorObservable = this.store.select(userSelector.loggedUser);
  form: FormGroup = new FormGroup({});
  subcriptions: Subscription[] = [];
  _id: string = '';
  incorrectConfirmation: boolean = false;

  constructor(private store: Store<AppState>, private fb: FormBuilder, private userService: UsersService, private router: Router, private toastService: ToastService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
    this.subcriptions.push(this.userSelectorObservable.subscribe((user) => {
      this.form.patchValue({ firstName: user?.firstName, lastName: user?.lastName, image: user?.image, username: user?.username });
      this._id = user?._id || '';
    }));
    this.subcriptions.push(this.form.valueChanges.subscribe(() => {
      this.incorrectConfirmation = false;
    }));
    this.store.dispatch(unsavedFormActions.formInitialized({ formId: 'CHANGE_PASSWORD', value: this.form.value }));
    this.subcriptions.push(this.form.valueChanges.subscribe((value) => {
      this.store.dispatch(unsavedFormActions.formValueChanged({ formId: 'CHANGE_PASSWORD', value }));
    }));
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    if (this.form?.get('password')?.value !== this.form?.get('confirmPassword')?.value) {
      this.incorrectConfirmation = true;
      return;
    }
    this.store.dispatch(loaderActions.startLoading({ loadingName: 'UPDATE_USER' }));
    this.subcriptions.push(this.userService.changePassword(this.form?.get('password')?.value, this._id).subscribe((response) => {
      this.store.dispatch(userActions.accessTokenUpdated({ accessToken: response.accessToken }));
      this.store.dispatch(userActions.refreshTokenUpdated({ refreshToken: response.refreshToken }));
      this.store.dispatch(userActions.loggedUserUpdated({ loggedUser: response.user }));
      localStorage.setItem('loggedUser', JSON.stringify(response.user));
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      this.store.dispatch(loaderActions.stopLoading({ loadingName: 'UPDATE_USER' }));
      this.toastService.show('Contraseña actualizada correctamente', { classname: 'bg-success text-light', delay: 3000, type: 'SUCCESS' });
      this.subcriptions.push(this.userService.getUserImage(response.user._id || '').subscribe((image) => {
        this.store.dispatch(userActions.userImageUpdated({ image: image.image }));
        this.store.dispatch(unsavedFormActions.unsavedFormsCleaned());
        this.router.navigate(['specific', 'notes']);
      }));
    }, (error) => {
      this.store.dispatch(loaderActions.stopLoading({ loadingName: 'UPDATE_USER' }));
      this.toastService.show('Ocurrió un error al realizar tu solicitud', { classname: 'bg-danger text-light', delay: 3000, type: 'FAILURE' });
    }));
  }

  cancel(): void {
    this.router.navigate(['specific', 'notes']);
  }

  ngOnDestroy(): void {
    this.subcriptions.forEach((s) => {
      s.unsubscribe();
    });
    this.store.dispatch(unsavedFormActions.unsavedFormsCleaned());
  }

}
