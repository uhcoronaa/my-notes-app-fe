import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoteFormComponent } from './note-form/note-form.component';
import { UnsavedFormConfirmationComponent } from './unsaved-form-confirmation/unsaved-form-confirmation.component';



@NgModule({
  declarations: [
    CategoryFormComponent,
    NoteFormComponent,
    UnsavedFormConfirmationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    CategoryFormComponent,
    NoteFormComponent
  ]
})
export class ReusableModule { }
