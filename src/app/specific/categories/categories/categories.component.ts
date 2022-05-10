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
  errorsObservable = this.store.select(categoriesSelectors.errors);
  invalidDelete: boolean = false;

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
        this.toastService.show('Ocurrió un error al realizar tu solicitud', { classname: 'bg-danger text-light', delay: 3000, type: 'FAILURE' });
      }));
    this.subscriptions.push(this.errorsObservable.subscribe((errors) => {
      this.invalidDelete = errors.some((e) => e.messages.some((e2) => e2 === 'NOTES_WITH_CATEGORY'));
    }));
  }

  newCategory(): void {
    this.store.dispatch(categoriesActions.resetApiErrors());
    this.router.navigate(['specific', 'categories', 'create']);
  }

  deleteCategory(id: string): void {
    this.store.dispatch(categoriesActions.resetApiErrors());
    this.store.dispatch(loaderActions.startLoading({ loadingName: 'DELETE_CATEGORIES' }));
    this.subscriptions.push(this.categoriesService.deleteCategory(id)
      .subscribe(() => {
        this.store.dispatch(categoriesActions.deleteCategory({ id }));
        this.store.dispatch(loaderActions.stopLoading({ loadingName: 'DELETE_CATEGORIES' }));
        this.toastService.show('Categoría eliminada correctamente', { classname: 'bg-success text-light', delay: 3000, type: 'SUCCESS' });
      }, (error) => {
        this.store.dispatch(categoriesActions.saveApiError({ error: { type: 'DELETE', messages: error.error.messages } }));
        this.store.dispatch(loaderActions.stopLoading({ loadingName: 'DELETE_CATEGORIES' }));
        this.toastService.show('Ocurrió un error al realizar tu solicitud', { classname: 'bg-danger text-light', delay: 3000, type: 'FAILURE' });
      }));
  }

  editCategory(id: string): void {
    this.store.dispatch(categoriesActions.resetApiErrors());
    this.router.navigate(['specific', 'categories', id]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    })
  }

}
