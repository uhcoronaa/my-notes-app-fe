import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/interfaces/categories.interface';
import { CategoriesService } from 'src/app/services/categories.service';
import * as categoriesActions from '../state/categories.actions';

@Component({
  selector: 'my-notes-app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  constructor(private router: Router, private categoriesService: CategoriesService, private store: Store) { }

  ngOnInit(): void {
  }

  saveCategory(category: Partial<Category>) {
    this.subscriptions.push(this.categoriesService.saveCategory(category).subscribe((category) => {
      this.store.dispatch(categoriesActions.addCategory({ category }));
      this.router.navigate(['specific', 'categories']);
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
    })
  }

}
