import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/interfaces/categories.interface';
import { Note } from 'src/app/interfaces/note.interface';
import { CategoriesService } from 'src/app/services/categories.service';
import { NotesService } from 'src/app/services/notes.service';
import * as notesActions from '../state/notes.actions';
import * as loaderActions from '../../loader/loader.actions';

@Component({
  selector: 'my-notes-app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit , OnDestroy{

  editNote: Note | null = null;
  categories: Category[] | null = null;
  subscriptions: Subscription[] = [];

  constructor(private notesService: NotesService, private activatedRoute: ActivatedRoute, private store: Store, private router: Router, private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.store.dispatch(loaderActions.startLoading({ loadingName: 'LOAD_NOTE' }));
    this.subscriptions.push(this.notesService.fetchNoteById(this.activatedRoute.snapshot.params['id']).subscribe((note: Note) => {
      this.editNote = note;
      this.store.dispatch(loaderActions.stopLoading({ loadingName: 'LOAD_NOTE' }));
    }));
    this.store.dispatch(loaderActions.startLoading({ loadingName: 'LOAD_CATEGORIES' }));
    this.subscriptions.push(this.categoriesService.fetchCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.store.dispatch(loaderActions.stopLoading({ loadingName: 'LOAD_CATEGORIES' }));
      }));
  }

  edit(note: Partial<Note>) {
    this.store.dispatch(loaderActions.startLoading({ loadingName: 'EDIT_NOTE' }));
    if (this.editNote?._id) {
      this.subscriptions.push(this.notesService.patchNote(this.editNote._id, note).subscribe((note) => {
        if (this.editNote?._id) {
          this.store.dispatch(notesActions.updateNote({ id: this.editNote._id, note }));
          this.store.dispatch(loaderActions.stopLoading({ loadingName: 'EDIT_NOTE' }));
          this.router.navigate(['specific', 'notes']);
        }
      }))
    }
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
