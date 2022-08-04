import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/interfaces/categories.interface';
import { Note } from 'src/app/interfaces/note.interface';
import { CategoriesService } from 'src/app/services/categories.service';
import { NotesService } from 'src/app/services/notes.service';
import * as notesActions from '../state/notes.actions';
import * as loaderActions from '../../loader/loader.actions';
import * as unsavedFormsActions from '../../unsaved-forms/unsaved-forms.actions';
import { ToastService } from 'src/app/services/toast.service';
import * as categoriesActions from '../../categories/state/categories.actions';
import { AppState } from 'src/app/state/app-state';

@Component({
  selector: 'my-notes-app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit, OnDestroy {

  categories: Category[] | null = null;
  subscriptions: Subscription[] = [];

  constructor(private categoriesService: CategoriesService, private notesService: NotesService, private store: Store<AppState>, private router: Router, private toastService: ToastService) { }

  ngOnInit(): void {
    this.store.dispatch(loaderActions.startLoading({ loadingName: 'LOAD_CATEGORIES' }));
    this.subscriptions.push(this.categoriesService.fetchCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.store.dispatch(loaderActions.stopLoading({ loadingName: 'LOAD_CATEGORIES' }));
      }, (error) => {
        this.store.dispatch(categoriesActions.saveApiError({ error: { type: 'GET', messages: error.error.messages } }));
        this.store.dispatch(loaderActions.stopLoading({ loadingName: 'LOAD_CATEGORIES' }));
        this.toastService.show('Ocurrió un error al realizar tu solicitud', { classname: 'bg-danger text-light', delay: 3000, type: 'FAILURE' });
      }));
  }

  saveNote(note: Partial<Note>) {
    this.store.dispatch(categoriesActions.resetApiErrors());
    this.store.dispatch(loaderActions.startLoading({ loadingName: 'SAVE_NOTES' }));
    this.subscriptions.push(this.notesService.saveNote(note).subscribe((note) => {
      this.store.dispatch(notesActions.addNote({ note }));
      this.store.dispatch(loaderActions.stopLoading({ loadingName: 'SAVE_NOTES' }));
      this.store.dispatch(unsavedFormsActions.unsavedFormsCleaned());
      this.router.navigate(['specific', 'notes']);
      this.toastService.show('Nota creada correctamente', { classname: 'bg-success text-light', delay: 3000, type: 'SUCCESS' });
    }, (error) => {
      this.store.dispatch(notesActions.saveApiError({ error: { type: 'POST', messages: error.error.messages } }));
      this.store.dispatch(loaderActions.stopLoading({ loadingName: 'SAVE_NOTES' }));
      this.toastService.show('Ocurrió un error al realizar tu solicitud', { classname: 'bg-danger text-light', delay: 3000, type: 'FAILURE' });
    }));
  }

  cancel(status: boolean) {
    if (status) {
      this.router.navigate(['specific', 'notes']);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
    this.store.dispatch(unsavedFormsActions.unsavedFormsCleaned());
  }

}
