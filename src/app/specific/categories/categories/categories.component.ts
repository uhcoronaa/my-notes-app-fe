import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/interfaces/categories.interface';
import { CategoriesService } from 'src/app/services/categories.service';
import * as categoriesActions from '../state/categories.actions';
import * as categoriesSelectors from '../state/categories.selectors';
import * as loaderActions from '../../loader/loader.actions';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'my-notes-app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  categoriesObservable: Observable<Category[]> = this.store.select(categoriesSelectors.categoriesList);
  subscriptions: Subscription[] = [];

  constructor(private store: Store, private router: Router, private categoriesService: CategoriesService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.store.dispatch(loaderActions.startLoading({ loadingName: 'LOAD_CATEGORIES' }));
    this.subscriptions.push(this.categoriesService.fetchCategories()
      .subscribe((categories: Category[]) => {
        this.store.dispatch(categoriesActions.loadCategories({ categories }));
        this.store.dispatch(loaderActions.stopLoading({ loadingName: 'LOAD_CATEGORIES' }));
      }, (error) => {
        this.store.dispatch(categoriesActions.saveApiError({ error: { type: 'GET', messages: error.error.messages } }));
        this.store.dispatch(loaderActions.stopLoading({ loadingName: 'LOAD_CATEGORIES' }));
        this.toastService.show('An error ocurred while performing your request', { classname: 'bg-danger text-light', delay: 3000, type: 'FAILURE' });
      }));
  }

  newCategory(): void {
    this.router.navigate(['specific', 'categories', 'create']);
  }

  deleteCategory(id: string): void {
    this.store.dispatch(loaderActions.startLoading({ loadingName: 'DELETE_CATEGORIES' }));
    this.subscriptions.push(this.categoriesService.deleteCategory(id)
      .subscribe(() => {
        this.store.dispatch(categoriesActions.deleteCategory({ id }));
        this.store.dispatch(loaderActions.stopLoading({ loadingName: 'DELETE_CATEGORIES' }));
        this.toastService.show('Category deleted successfuly', { classname: 'bg-success text-light', delay: 3000, type: 'SUCCESS' });
      }, (error) => {
        this.store.dispatch(categoriesActions.saveApiError({ error: { type: 'DELETE', messages: error.error.messages } }));
        this.store.dispatch(loaderActions.stopLoading({ loadingName: 'DELETE_CATEGORIES' }));
        this.toastService.show('An error ocurred while performing your request', { classname: 'bg-danger text-light', delay: 3000, type: 'FAILURE' });
      }));
  }

  editCategory(id: string): void {
    this.router.navigate(['specific', 'categories', id]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    })
  }

}
