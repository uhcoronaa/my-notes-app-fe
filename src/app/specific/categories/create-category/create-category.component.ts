import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/interfaces/categories.interface';
import { CategoriesService } from 'src/app/services/categories.service';
import * as categoriesActions from '../state/categories.actions';
import * as loaderActions from '../../loader/loader.actions';
import * as unsavedFormsActions from '../../unsaved-forms/unsaved-forms.actions';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'my-notes-app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  constructor(private router: Router, private categoriesService: CategoriesService, private store: Store, private toastService: ToastService) { }

  ngOnInit(): void {
  }

  saveCategory(category: Partial<Category>) {
    this.store.dispatch(loaderActions.startLoading({ loadingName: 'SAVE_CATEGORIES' }));
    this.subscriptions.push(this.categoriesService.saveCategory(category).subscribe((category) => {
      this.store.dispatch(categoriesActions.addCategory({ category }));
      this.store.dispatch(loaderActions.stopLoading({ loadingName: 'SAVE_CATEGORIES' }));
      this.store.dispatch(unsavedFormsActions.unsavedFormsCleaned());
      this.router.navigate(['specific', 'categories']);
      this.toastService.show('Category saved successfully', { classname: 'bg-success text-light', delay: 3000, type: 'SUCCESS' });
    }));
  }

  cancel(status: boolean) {
    if (status) {
      this.router.navigate(['specific', 'categories']);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s)=>{
      s.unsubscribe();
    });
    this.store.dispatch(unsavedFormsActions.unsavedFormsCleaned());
  }

}
