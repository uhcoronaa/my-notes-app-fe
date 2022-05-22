import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnsavedFormsGuard } from 'src/app/guards/unsaved-forms.guard';
import { CategoriesComponent } from './categories/categories.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [UnsavedFormsGuard],
    component: CategoriesComponent
  },
  {
    path: 'create',
    canActivate: [UnsavedFormsGuard],
    component: CreateCategoryComponent
  },
  {
    path: ':id',
    canActivate: [UnsavedFormsGuard],
    component: EditCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
