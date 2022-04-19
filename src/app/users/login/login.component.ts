import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as userActions from '../state/users.actions';
import { UsersService } from 'src/app/services/users.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-state-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  signUpForm: FormGroup = new FormGroup({});
  signUpModal: NgbModalRef | null = null;

  constructor(private store: Store, private router: Router, private fb: FormBuilder, private userService: UsersService, private modalService: NgbModal) { }

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
  }

  login(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.userService.login(this.form.value).subscribe((response) => {
      this.store.dispatch(userActions.accessTokenUpdated({ accessToken: response.accessToken }));
      this.store.dispatch(userActions.refreshTokenUpdated({ refreshToken: response.refreshToken }));
      this.store.dispatch(userActions.loggedUserUpdated({ loggedUser: response.user }));
      localStorage.setItem('loggedUser', JSON.stringify(response.user));
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      this.router.navigate(['specific']);
    });
  }

  open(content: any) {
    this.signUpModal = this.modalService.open(content, { centered: true });
  }

  signUp(content: any): void {
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.invalid) return;
    this.userService.signUp(this.signUpForm.value).subscribe((response) => {
      this.store.dispatch(userActions.accessTokenUpdated({ accessToken: response.accessToken }));
      this.store.dispatch(userActions.refreshTokenUpdated({ refreshToken: response.refreshToken }));
      this.store.dispatch(userActions.loggedUserUpdated({ loggedUser: response.user }));
      localStorage.setItem('loggedUser', JSON.stringify(response.user));
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      this.signUpModal && this.signUpModal.dismiss();
      this.signUpModal = null;
      this.router.navigate(['specific']);
    });
  }

}
