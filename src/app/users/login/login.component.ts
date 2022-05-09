import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as userActions from '../state/users.actions';
import { UsersService } from 'src/app/services/users.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import * as loaderActions from '../../specific/loader/loader.actions';
import { ToastService } from 'src/app/services/toast.service';
import { encrypt } from 'src/assets/cipher';
import * as userSelector from '../../users/state/users.selectors';

@Component({
  selector: 'app-state-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup = new FormGroup({});
  signUpForm: FormGroup = new FormGroup({});
  signUpModal: NgbModalRef | null = null;
  subscriptions: Subscription[] = [];
  invalidPassword: boolean = false;
  userNotFound: boolean = false;
  duplicatedUsername: boolean = false;

  errorsObservable = this.store.select(userSelector.errors);

  constructor(private store: Store, private router: Router, private fb: FormBuilder, private userService: UsersService, private modalService: NgbModal, private toastService: ToastService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
    this.signUpForm = this.fb.group({
      username: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
    this.subscriptions.push(this.errorsObservable.subscribe((errors) => {
      this.invalidPassword = errors.some((e) => e.messages.some((e2) => e2 === 'INVALID_PASSWORD'));
      this.userNotFound = errors.some((e) => e.messages.some((e2) => e2 === 'USER_NOT_FOUND'));
      this.duplicatedUsername = errors.some((e) => e.messages.some((e2) => e2 === 'DUPLICATED_USERNAME'));
    }));
    this.subscriptions.push(this.form.valueChanges.subscribe((v) => {
      this.store.dispatch(userActions.resetApiErrors());
    }));
    this.subscriptions.push(this.signUpForm.valueChanges.subscribe((v) => {
      this.store.dispatch(userActions.resetApiErrors());
    }));
  }

  login(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.store.dispatch(loaderActions.startLoading({ loadingName: 'START_LOGIN' }));
    this.store.dispatch(userActions.resetApiErrors());
    const userBody = {
      ...this.form.value,
      password: encrypt(this.form.get('password')?.value)
    }
    this.subscriptions.push(this.userService.login(userBody).subscribe((response) => {
      this.store.dispatch(userActions.accessTokenUpdated({ accessToken: response.accessToken }));
      this.store.dispatch(userActions.refreshTokenUpdated({ refreshToken: response.refreshToken }));
      this.store.dispatch(userActions.loggedUserUpdated({ loggedUser: response.user }));
      localStorage.setItem('loggedUser', JSON.stringify(response.user));
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      this.store.dispatch(loaderActions.stopLoading({ loadingName: 'START_LOGIN' }));
      this.subscriptions.push(this.userService.getUserImage(response.user._id || '').subscribe((image) => {
        this.store.dispatch(userActions.userImageUpdated({ image: image.image }));
        this.router.navigate(['specific']);
      }));
    }, (error) => {
      this.store.dispatch(userActions.saveApiError({ error: { type: 'POST', messages: error.error.messages } }));
      this.store.dispatch(loaderActions.stopLoading({ loadingName: 'START_LOGIN' }));
      this.toastService.show('An error ocurred while performing your request', { classname: 'bg-danger text-light', delay: 3000, type: 'FAILURE' });
    }));
  }

  open(content: any) {
    this.store.dispatch(userActions.resetApiErrors());
    this.signUpModal = this.modalService.open(content, { centered: true });
  }

  signUp(content: any): void {
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.invalid) return;
    const userBody = {
      ...this.signUpForm.value,
      password: encrypt(this.signUpForm.get('password')?.value)
    }
    this.store.dispatch(loaderActions.startLoading({ loadingName: 'START_SIGNUP' }));
    this.store.dispatch(userActions.resetApiErrors());
    this.subscriptions.push(this.userService.signUp(userBody).subscribe((response) => {
      this.store.dispatch(userActions.accessTokenUpdated({ accessToken: response.accessToken }));
      this.store.dispatch(userActions.refreshTokenUpdated({ refreshToken: response.refreshToken }));
      this.store.dispatch(userActions.loggedUserUpdated({ loggedUser: response.user }));
      localStorage.setItem('loggedUser', JSON.stringify(response.user));
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      this.signUpModal && this.signUpModal.dismiss();
      this.signUpModal = null;
      this.store.dispatch(loaderActions.stopLoading({ loadingName: 'START_SIGNUP' }));
      this.subscriptions.push(this.userService.getUserImage(response.user._id || '').subscribe((image) => {
        this.store.dispatch(userActions.userImageUpdated({ image: image.image }));
        this.router.navigate(['specific']);
      }));
    }, (error) => {
      this.store.dispatch(userActions.saveApiError({ error: { type: 'POST', messages: error.error.messages } }));
      this.store.dispatch(loaderActions.stopLoading({ loadingName: 'START_SIGNUP' }));
      this.toastService.show('An error ocurred while performing your request', { classname: 'bg-danger text-light', delay: 3000, type: 'FAILURE' });
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    })
  }

}
