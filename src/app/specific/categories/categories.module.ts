import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { StoreModule } from '@ngrx/store';
import { categoriesReducer } from './state/categories.reducer';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { ReusableModule } from 'src/app/reusable/reusable.module';
import { EditCategoryComponent } from './edit-category/edit-category.component';


@NgModule({
  declarations: [
    CategoriesComponent,
    CreateCategoryComponent,
    EditCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    StoreModule.forFeature('categories', categoriesReducer),
    ReusableModule
  ]
})
export class CategoriesModule { }
