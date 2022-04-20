import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Note } from 'src/app/interfaces/note.interface';
import { CategoriesService } from 'src/app/services/categories.service';
import * as notesActions from '../state/notes.actions';
import * as notesSelectors from '../state/notes.selectors';

@Component({
  selector: 'my-notes-app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notesObservable: Observable<Note[]> = this.store.select(notesSelectors.notesList);

  constructor(private store: Store, private router: Router, private notesService: CategoriesService) { }

  ngOnInit(): void {
    // this.notesService.fetchCategories()
    //   .subscribe((notes: Note[]) => {
    //     this.store.dispatch(notesActions.loadNotes({ notes }));
    //   });
  }

  newNote(): void {
    this.router.navigate(['specific', 'notes', 'create']);
  }

  deleteCategory(id: string): void {
    this.notesService.deleteCategory(id)
      .subscribe(() => {
        this.store.dispatch(notesActions.deleteNote({ id }));
      });
  }

  editCategory(id: string): void {
    this.router.navigate(['specific', 'categories', id]);
  }

}
