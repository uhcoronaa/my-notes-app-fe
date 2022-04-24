import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SortNotesComponent } from './sort-notes/sort-notes.component';

const routes: Routes = [
  {
    path: '',
    component: SortNotesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SortNotesRoutingModule { }
