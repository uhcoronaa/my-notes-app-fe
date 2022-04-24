import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/interfaces/categories.interface';
import { Note } from 'src/app/interfaces/note.interface';
import { CategoriesService } from 'src/app/services/categories.service';
import { NotesService as NotesService } from 'src/app/services/notes.service';
import * as notesActions from '../state/notes.actions';

@Component({
  selector: 'my-notes-app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit, OnDestroy {

  categories: Category[] | null = null;
  subscriptions: Subscription[] = [];

  constructor(private categoriesService: CategoriesService, private notesService: NotesService, private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.subscriptions.push(this.categoriesService.fetchCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      }));
  }

  saveNote(note: Partial<Note>) {
    this.subscriptions.push(this.notesService.saveNote(note).subscribe((note) => {
      this.store.dispatch(notesActions.addNote({ note }));
      this.router.navigate(['specific', 'notes']);
    }))
  }

  cancel(status: boolean) {
    if (status) {
      this.router.navigate(['specific', 'notes']);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s)=>{
      s.unsubscribe();
    })
  }

}
