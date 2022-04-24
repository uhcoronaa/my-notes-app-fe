import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/interfaces/categories.interface';
import { CategoriesService } from 'src/app/services/categories.service';
import * as categoriesActions from '../state/categories.actions';
import * as categoriesSelectors from '../state/categories.selectors';
import * as loaderActions from '../../loader/loader.actions';

@Component({
  selector: 'my-notes-app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  categoriesObservable: Observable<Category[]> = this.store.select(categoriesSelectors.categoriesList);
  subscriptions: Subscription[] = [];

  constructor(private store: Store, private router: Router, private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.store.dispatch(loaderActions.startLoading({ loadingName: 'LOAD_CATEGORIES' }));
    this.subscriptions.push(this.categoriesService.fetchCategories()
      .subscribe((categories: Category[]) => {
        this.store.dispatch(categoriesActions.loadCategories({ categories }));
        this.store.dispatch(loaderActions.stopLoading({ loadingName: 'LOAD_CATEGORIES' }));
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
      }));
  }

  editCategory(id: string): void {
    this.router.navigate(['specific', 'categories', id]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s)=>{
      s.unsubscribe();
    })
  }

}
