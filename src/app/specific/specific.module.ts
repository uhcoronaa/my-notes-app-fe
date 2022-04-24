import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecificRoutingModule } from './specific-routing.module';
import { SpecificComponent } from './specific/specific.component';
import { StoreModule } from '@ngrx/store';
import { sortNotesReducer } from './sort-notes/state/sort-notes.reducer';


@NgModule({
  declarations: [
    SpecificComponent
  ],
  imports: [
    CommonModule,
    SpecificRoutingModule,
    StoreModule.forFeature('sort-notes', sortNotesReducer),
  ]
})
export class SpecificModule { }
