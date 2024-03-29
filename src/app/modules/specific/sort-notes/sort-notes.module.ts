import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop'

import { SortNotesRoutingModule } from './sort-notes-routing.module';
import { SortNotesComponent } from './sort-notes/sort-notes.component';
import { StoreModule } from '@ngrx/store';
import { notesReducer } from '../notes/state/notes.reducer';
import { DirectivesModule } from 'src/app/directives/directives.module';


@NgModule({
  declarations: [
    SortNotesComponent
  ],
  imports: [
    CommonModule,
    SortNotesRoutingModule,
    DragDropModule,
    DirectivesModule
  ]
})
export class SortNotesModule { }
