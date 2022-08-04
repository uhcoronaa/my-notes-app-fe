import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { CreateNoteComponent } from './create-note/create-note.component';
import { ReusableModule } from 'src/app/modules/reusable/reusable.module';
import { StoreModule } from '@ngrx/store';
import { notesReducer } from './state/notes.reducer';
import { NotesComponent } from './notes/notes.component';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { DirectivesModule } from 'src/app/directives/directives.module';

@NgModule({
  declarations: [
    CreateNoteComponent,
    NotesComponent,
    EditNoteComponent
  ],
  imports: [
    CommonModule,
    NotesRoutingModule,
    ReusableModule,
    DirectivesModule,
  ]
})
export class NotesModule { }
