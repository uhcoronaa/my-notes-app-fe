import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Note } from 'src/app/interfaces/note.interface';
import { NotesService } from 'src/app/services/notes.service';
import * as notesActions from '../state/notes.actions';
import * as notesSelectors from '../state/notes.selectors';
import * as loaderActions from '../../loader/loader.actions';
import * as sortNotesActions from '../../sort-notes/state/sort-notes.actions';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'my-notes-app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit, OnDestroy {

  notesObservable: Observable<Note[]> = this.store.select(notesSelectors.notesList);
  subscriptions: Subscription[] = [];

  constructor(private store: Store, private router: Router, private notesService: NotesService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.store.dispatch(loaderActions.startLoading({ loadingName: 'LOAD_NOTES' }));
    this.fetchNotes();
  }

  newNote(): void {
    this.router.navigate(['specific', 'notes', 'create']);
  }

  deleteNote(id: string): void {
    this.store.dispatch(loaderActions.startLoading({ loadingName: 'DELETE_NOTE' }));
    this.subscriptions.push(this.notesService.deleteNote(id)
      .subscribe(() => {
        this.store.dispatch(notesActions.deleteNote({ id }));
        this.store.dispatch(loaderActions.stopLoading({ loadingName: 'DELETE_NOTE' }));
        this.fetchNotes();
        this.toastService.show('Nota eliminada correctamente', { classname: 'bg-success text-light', delay: 3000, type: 'SUCCESS' });
      }, (error) => {
        this.store.dispatch(notesActions.saveApiError({ error: { type: 'DELETE', messages: error.error.messages } }));
        this.store.dispatch(loaderActions.stopLoading({ loadingName: 'DELETE_NOTE' }));
        this.toastService.show('Ocurrió un error al realizar tu solicitud', { classname: 'bg-danger text-light', delay: 3000, type: 'FAILURE' });
      }));
  }

  editNote(id: string): void {
    this.router.navigate(['specific', 'notes', id]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    })
  }

  fetchNotes(): void {
    this.subscriptions.push(this.notesService.fetchNotes()
      .subscribe((notes: Note[]) => {
        this.store.dispatch(notesActions.loadNotes({ notes }));
        const todoNotes = notes.filter((n) => n.status === 'TO_DO').length;
        const inProgressNotes = notes.filter((n) => n.status === 'IN_PROGRESS').length;
        const doneNotes = notes.filter((n) => n.status === 'DONE').length;
        this.store.dispatch(sortNotesActions.updateTodoNotes({ todoNotes }));
        this.store.dispatch(sortNotesActions.updateInProgressNotes({ inProgressNotes }));
        this.store.dispatch(sortNotesActions.updateDoneNotes({ doneNotes }));
        this.store.dispatch(loaderActions.stopLoading({ loadingName: 'LOAD_NOTES' }));
        this.store.dispatch(loaderActions.stopLoading({ loadingName: 'LOAD_NOTES' }));
      }, (error) => {
        this.store.dispatch(notesActions.saveApiError({ error: { type: 'GET', messages: error.error.messages } }));
        this.store.dispatch(loaderActions.stopLoading({ loadingName: 'LOAD_NOTES' }));
        this.toastService.show('Ocurrió un error al realizar tu solicitud', { classname: 'bg-danger text-light', delay: 3000, type: 'FAILURE' });
      }));
  }

}
