import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/interfaces/categories.interface';
import { CategoriesService } from 'src/app/services/categories.service';
import * as categoriesActions from '../state/categories.actions';
import * as loaderActions from '../../loader/loader.actions';
import * as unsavedFormsActions from '../../unsaved-forms/unsaved-forms.actions';
import { ToastService } from 'src/app/services/toast.service';
import { AppState } from 'src/app/state/app-state';

@Component({
  selector: 'my-notes-app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  editCategory: Category | null = null;
  subscriptions: Subscription[] = [];

  constructor(private store: Store<AppState>, private categoriesService: CategoriesService, private activatedRoute: ActivatedRoute, private router: Router, private toastService: ToastService) { }

  ngOnInit(): void {
    this.store.dispatch(loaderActions.startLoading({ loadingName: 'LOAD_CATEGORY' }));
    this.subscriptions.push(this.categoriesService.fetchById(this.activatedRoute.snapshot.params['id']).subscribe((category: Category) => {
      this.editCategory = category;
      this.store.dispatch(loaderActions.stopLoading({ loadingName: 'LOAD_CATEGORY' }));
    }, (error) => {
      this.store.dispatch(categoriesActions.saveApiError({ error: { type: 'GET', messages: error.error.messages } }));
      this.store.dispatch(loaderActions.stopLoading({ loadingName: 'LOAD_CATEGORY' }));
      this.toastService.show('Ocurrió un error al realizar tu solicitud', { classname: 'bg-danger text-light', delay: 3000, type: 'FAILURE' });
    }));
  }

  edit(category: Partial<Category>) {
    this.store.dispatch(categoriesActions.resetApiErrors());
    this.store.dispatch(loaderActions.startLoading({ loadingName: 'SAVE_CATEGORY' }));
    if (this.editCategory?._id) {
      this.subscriptions.push(this.categoriesService.patchCategory(this.editCategory._id, category).subscribe((category) => {
        if (this.editCategory?._id) {
          this.store.dispatch(categoriesActions.updateCategory({ id: this.editCategory._id, category }));
          this.store.dispatch(loaderActions.stopLoading({ loadingName: 'SAVE_CATEGORY' }));
          this.store.dispatch(unsavedFormsActions.unsavedFormsCleaned());
          this.router.navigate(['specific', 'categories']);
          this.toastService.show('Categoría editada correctamente', { classname: 'bg-success text-light', delay: 3000, type: 'SUCCESS' });
        }
      }, (error) => {
        this.store.dispatch(categoriesActions.saveApiError({ error: { type: 'PATCH', messages: error.error.messages } }));
        this.store.dispatch(loaderActions.stopLoading({ loadingName: 'SAVE_CATEGORY' }));
        this.toastService.show('Ocurrió un error al realizar tu solicitud', { classname: 'bg-danger text-light', delay: 3000, type: 'FAILURE' });
      }));
    }
  }

  cancel(status: boolean) {
    if (status) {
      this.router.navigate(['specific', 'categories']);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
    this.store.dispatch(unsavedFormsActions.unsavedFormsCleaned());
  }

}
