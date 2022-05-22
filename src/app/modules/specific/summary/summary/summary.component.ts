import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import * as loaderActions from '../../loader/loader.actions';
import * as unsavedFormActions from '../../unsaved-forms/unsaved-forms.actions';
import * as userActions from '../../../users/state/users.actions';
import { ToastService } from 'src/app/services/toast.service';
import { AppState } from 'src/app/state/app-state';

@Component({
  selector: 'my-notes-app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  state: any = null;
  loadForm: FormGroup = new FormGroup({});
  changesForm: FormGroup = new FormGroup({});
  errorForm: FormGroup = new FormGroup({});

  constructor(private store: Store<AppState>, private fb: FormBuilder, private toastService: ToastService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.store.pipe(
      map((state: any) => {
        return {
          ...state,
          user: {
            loggedUser: {
              ...state?.user?.loggedUser,
              image: '...'
            },
            errors: [...state?.user?.errors]
          },
          notes: {
            notesList: state?.notes?.notesList.map((n: any) => ({ ...n, image: '...' }))
          },
          categories: {
            categoriesList: state?.categories?.categoriesList.map((c: any) => ({ ...c, image: '...' }))
          }
        }
      })
    ).subscribe((state) => {
      this.state = state;
    }));
    this.loadForm = this.fb.group({
      time: [4, [Validators.required]]
    });
    this.changesForm = this.fb.group({
      title: ['Titulo inicial', [Validators.required]],
      message: ['Mensaje inicial', [Validators.required]]
    });
    this.store.dispatch(unsavedFormActions.formInitialized({ formId: 'CHANGES_FORM_TEST', value: this.changesForm.value }));
    this.subscriptions.push(this.changesForm.valueChanges.subscribe((value) => {
      this.store.dispatch(unsavedFormActions.formValueChanged({ formId: 'CHANGES_FORM_TEST', value }));
    }));
    this.errorForm = this.fb.group({
      type: ['POST', [Validators.required]],
      message: ['Título inválido', [Validators.required]]
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(userActions.resetApiErrors());
    this.store.dispatch(unsavedFormActions.unsavedFormsCleaned());
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  loadTest(): void {
    this.loadForm.markAllAsTouched();
    if (this.loadForm.invalid) return;
    this.store.dispatch(loaderActions.startLoading({ loadingName: 'LOAD_TEST' }));
    setTimeout(() => {
      this.store.dispatch(loaderActions.stopLoading({ loadingName: 'LOAD_TEST' }));
    }, Number(this.loadForm?.get('time')?.value) * 1000 || 0);
  }

  generateError(): void {
    this.errorForm.markAllAsTouched();
    if(this.errorForm.invalid) return;
    this.store.dispatch(userActions.saveApiError({ error: { type: this.errorForm?.get('type')?.value, messages: [this.errorForm?.get('message')?.value] } }));
    this.toastService.show('Ocurrió un error al realizar tu solicitud', { classname: 'bg-danger text-light', delay: 3000, type: 'FAILURE' });
  }

  cleanErrors(): void {
    this.store.dispatch(userActions.resetApiErrors());
  }

}
