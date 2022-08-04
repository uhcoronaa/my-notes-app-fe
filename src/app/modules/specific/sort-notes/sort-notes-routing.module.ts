import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnsavedFormsGuard } from 'src/app/guards/unsaved-forms.guard';
import { SortNotesComponent } from './sort-notes/sort-notes.component';

const routes: Routes = [
  {
    path: '',
    component: SortNotesComponent,
    canActivate: [UnsavedFormsGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SortNotesRoutingModule { }
