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

@Component({
  selector: 'my-notes-app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  userSelectorObservable = this.store.select(userSelector.loggedUser);
  form: FormGroup = new FormGroup({});
  subcriptions: Subscription[] = [];
  _id: string = '';
  errorsObservable = this.store.select(userSelector.errors);
  duplicatedUsername: boolean = false;

  constructor(private fb: FormBuilder, private store: Store, private userService: UsersService, private router: Router, private toastService: ToastService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      image: [null, []],
      username: [null, [Validators.required]]
    });
    this.subcriptions.push(this.userSelectorObservable.subscribe((user) => {
      this.form.patchValue({ firstName: user?.firstName, lastName: user?.lastName, image: user?.image, username: user?.username });
      this._id = user?._id || '';
      this.store.dispatch(unsavedFormActions.formInitialized({ formId: 'PROFILE', value: this.form.value }));
      this.subcriptions.push(this.form.valueChanges.subscribe((value) => {
        this.store.dispatch(userActions.resetApiErrors());
        this.store.dispatch(unsavedFormActions.formValueChanged({ formId: 'PROFILE', value }));
      }));
    }));
    this.subcriptions.push(this.errorsObservable.subscribe((errors) => {
      this.duplicatedUsername = errors.some((e) => e.messages.some((e2) => e2 === 'DUPLICATED_USERNAME'));
    }));
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.store.dispatch(loaderActions.startLoading({ loadingName: 'UPDATE_USER' }));
    this.subcriptions.push(this.userService.updateUser(this.form.value, this._id).subscribe((response) => {
      this.store.dispatch(userActions.accessTokenUpdated({ accessToken: response.accessToken }));
      this.store.dispatch(userActions.refreshTokenUpdated({ refreshToken: response.refreshToken }));
      this.store.dispatch(userActions.loggedUserUpdated({ loggedUser: response.user }));
      localStorage.setItem('loggedUser', JSON.stringify(response.user));
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      this.store.dispatch(loaderActions.stopLoading({ loadingName: 'UPDATE_USER' }));
      this.toastService.show('Perfil actualizado correctamente', { classname: 'bg-success text-light', delay: 3000, type: 'SUCCESS' });
      this.subcriptions.push(this.userService.getUserImage(response.user._id || '').subscribe((image) => {
        this.store.dispatch(userActions.userImageUpdated({ image: image.image }));
        this.store.dispatch(unsavedFormActions.unsavedFormsCleaned());
        this.store.dispatch(userActions.resetApiErrors());
        this.router.navigate(['specific', 'notes']);
      }));
    }, (error) => {
      this.store.dispatch(loaderActions.stopLoading({ loadingName: 'UPDATE_USER' }));
      this.store.dispatch(userActions.saveApiError({ error: { type: 'PATCH', messages: error.error.messages } }));
      this.toastService.show('Ocurrió un error al realizar tu solicitud', { classname: 'bg-danger text-light', delay: 3000, type: 'FAILURE' });
    }));
  }

  cancel(): void {
    this.store.dispatch(userActions.resetApiErrors());
    this.router.navigate(['specific', 'notes']);
  }

  handleImageChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    const imageControl = this.form.get('image');
    reader.readAsDataURL(file);
    reader.onload = function () {
      imageControl?.patchValue(reader.result?.toString());
    };
  }

  ngOnDestroy(): void {
    this.subcriptions.forEach((s) => {
      s.unsubscribe();
    });
    this.store.dispatch(unsavedFormActions.unsavedFormsCleaned());
    this.store.dispatch(userActions.resetApiErrors());
  }

}
