import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoteFormComponent } from './note-form/note-form.component';
import { UnsavedFormConfirmationComponent } from './unsaved-form-confirmation/unsaved-form-confirmation.component';
import { ToastsComponent } from './toasts/toasts.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    CategoryFormComponent,
    NoteFormComponent,
    UnsavedFormConfirmationComponent,
    ToastsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbToastModule,
  ],
  exports: [
    CategoryFormComponent,
    NoteFormComponent,
    ToastsComponent
  ]
})
export class ReusableModule { }
