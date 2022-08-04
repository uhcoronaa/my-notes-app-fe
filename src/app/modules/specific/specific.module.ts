import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecificRoutingModule } from './specific-routing.module';
import { SpecificComponent } from './specific/specific.component';
import { StoreModule } from '@ngrx/store';
import { sortNotesReducer } from './sort-notes/state/sort-notes.reducer';
import { unsavedFormsReducers } from './unsaved-forms/unsaved-forms.reducer';
import { DirectivesModule } from '../../directives/directives.module';


@NgModule({
  declarations: [
    SpecificComponent
  ],
  imports: [
    CommonModule,
    SpecificRoutingModule,
    DirectivesModule
  ]
})
export class SpecificModule { }
