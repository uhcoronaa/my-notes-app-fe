import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { SpecificComponent } from './specific/specific.component';

const routes: Routes = [
  {
    path: '',
    component: SpecificComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'categories',
        loadChildren: () => import('./categories/categories.module').then((m) => m.CategoriesModule),
      },
      {
        path: 'notes',
        loadChildren: () => import('./notes/notes.module').then((m) => m.NotesModule)
      },
      {
        path: 'sort-notes',
        loadChildren: () => import('./sort-notes/sort-notes.module').then((m) => m.SortNotesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecificRoutingModule { }
