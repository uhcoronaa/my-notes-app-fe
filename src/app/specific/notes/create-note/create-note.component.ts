import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Category } from 'src/app/interfaces/categories.interface';
import { Note } from 'src/app/interfaces/note.interface';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'my-notes-app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {

  categories: Category[] | null = null;

  constructor(private categoriesService: CategoriesService, private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.categoriesService.fetchCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  saveNote(category: Partial<Note>) {
    // this.categoriesService.saveCategory(category).subscribe((category) => {
    //   this.store.dispatch(categoriesActions.addCategory({ category }));
    //   this.router.navigate(['specific', 'categories']);
    // })
  }

  cancel(status: boolean) {
    if (status) {
      this.router.navigate(['specific', 'notes']);
    }
  }

}
