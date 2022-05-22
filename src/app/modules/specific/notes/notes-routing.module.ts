import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnsavedFormsGuard } from 'src/app/guards/unsaved-forms.guard';
import { CreateNoteComponent } from './create-note/create-note.component';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { NotesComponent } from './notes/notes.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [UnsavedFormsGuard],
    component: NotesComponent
  },
  {
    path: 'create',
    canActivate: [UnsavedFormsGuard],
    component: CreateNoteComponent
  },
  {
    path: ':id',
    canActivate: [UnsavedFormsGuard],
    component: EditNoteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
