import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/interfaces/categories.interface';
import { CategoriesService } from 'src/app/services/categories.service';
import * as categoriesActions from '../state/categories.actions';

@Component({
  selector: 'my-notes-app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  editCategory: Category | null = null;
  subscriptions: Subscription[] = [];

  constructor(private store: Store, private categoriesService: CategoriesService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.subscriptions.push(this.categoriesService.fetchById(this.activatedRoute.snapshot.params['id']).subscribe((category: Category) => {
      this.editCategory = category;
    }));
  }

  edit(category: Partial<Category>) {
    if (this.editCategory?._id) {
      this.subscriptions.push(this.categoriesService.patchCategory(this.editCategory._id, category).subscribe((category) => {
        if (this.editCategory?._id) {
          this.store.dispatch(categoriesActions.updateCategory({ id: this.editCategory._id, category }));
          this.router.navigate(['specific', 'categories']);
        }
      }))
    }
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
