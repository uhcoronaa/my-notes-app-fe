import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Category } from 'src/app/interfaces/categories.interface';
import * as unsavedFormActions from '../../specific/unsaved-forms/unsaved-forms.actions';
@Component({
  selector: 'my-notes-app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  @Input() formType: 'edit' | 'create' = 'create';
  @Input() category: Category | null = null;
  @Output() saveEvent: EventEmitter<Partial<Category>> = new EventEmitter();
  @Output() cancelEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(private fb: FormBuilder, private store: Store) { }

  form: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.category?.name || null, [Validators.required]],
      description: [this.category?.description || null, [Validators.required]],
      image: [this.category?.image || null, []],
    });
    this.store.dispatch(unsavedFormActions.formInitialized({ formId: 'CATEGORY_FORM', value: this.form.value }));
    this.form.valueChanges.subscribe((value) => {
      this.store.dispatch(unsavedFormActions.formValueChanged({ formId: 'CATEGORY_FORM', value }));
    });
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.saveEvent.emit(this.form.value);
    }
  }

  cancel(): void {
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

}
