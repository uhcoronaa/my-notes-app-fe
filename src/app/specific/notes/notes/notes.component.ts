import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Note } from 'src/app/interfaces/note.interface';
import { NotesService } from 'src/app/services/notes.service';
import * as notesActions from '../state/notes.actions';
import * as notesSelectors from '../state/notes.selectors';

@Component({
  selector: 'my-notes-app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit, OnDestroy {

  notesObservable: Observable<Note[]> = this.store.select(notesSelectors.notesList);
  subscriptions: Subscription[] = [];

  constructor(private store: Store, private router: Router, private notesService: NotesService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.notesService.fetchNotes()
      .subscribe((notes: Note[]) => {
        this.store.dispatch(notesActions.loadNotes({ notes }));
      }));
  }

  newNote(): void {
    this.router.navigate(['specific', 'notes', 'create']);
  }

  deleteNote(id: string): void {
    this.subscriptions.push(this.notesService.deleteNote(id)
      .subscribe(() => {
        this.store.dispatch(notesActions.deleteNote({ id }));
      }));
  }

  editNote(id: string): void {
    this.router.navigate(['specific', 'notes', id]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s)=>{
      s.unsubscribe();
    })
  }

}
