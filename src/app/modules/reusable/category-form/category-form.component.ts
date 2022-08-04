import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Category } from 'src/app/interfaces/categories.interface';
import * as unsavedFormActions from '../../specific/unsaved-forms/unsaved-forms.actions';
import * as categorySelector from '../../specific/categories/state/categories.selectors';
import * as categoryActions from '../../specific/categories/state/categories.actions';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/state/app-state';
@Component({
  selector: 'my-notes-app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, OnDestroy {

  @Input() formType: 'edit' | 'create' = 'create';
  @Input() category: Category | null = null;
  @Output() saveEvent: EventEmitter<Partial<Category>> = new EventEmitter();
  @Output() cancelEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  errorsObservable = this.store.select(categorySelector.errors);

  form: FormGroup = new FormGroup({});
  duplicatedCategory: boolean = false;
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.category?.name || null, [Validators.required]],
      description: [this.category?.description || null, [Validators.required]],
      image: [this.category?.image || null, []],
    });
    this.store.dispatch(unsavedFormActions.formInitialized({ formId: 'CATEGORY_FORM', value: this.form.value }));
    this.subscriptions.push(this.form.valueChanges.subscribe((value) => {
      this.store.dispatch(unsavedFormActions.formValueChanged({ formId: 'CATEGORY_FORM', value }));
      this.store.dispatch(categoryActions.resetApiErrors());
    }));
    this.subscriptions.push(this.errorsObservable.subscribe((errors) => {
      this.duplicatedCategory = errors.some((e) => e.messages.some((e2) => e2 === 'DUPLICATED_CATEGORY'));
    }));
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.saveEvent.emit(this.form.value);
    }
  }

  cancel(): void {
    this.store.dispatch(categoryActions.resetApiErrors());
    this.cancelEvent.emit(true);
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
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

}
