import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NotesService } from 'src/app/services/notes.service';
import { Note } from 'src/app/interfaces/note.interface';
import { Store } from '@ngrx/store';
import * as notesActions from '../../../specific/notes/state/notes.actions';
import * as notesSelectors from '../../../specific/notes/state/notes.selectors';
import { Subscription } from 'rxjs';
import * as sortNotesActions from '../state/sort-notes.actions';
import * as loaderActions from '../../loader/loader.actions';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'my-notes-app-sort-notes',
  templateUrl: './sort-notes.component.html',
  styleUrls: ['./sort-notes.component.css']
})
export class SortNotesComponent implements OnInit, OnDestroy {


  todo: Note[] = [];
  done: Note[] = [];
  inProgress: Note[] = [];
  subscriptions: Subscription[] = [];
  notesObservable = this.store.select(notesSelectors.notesList);


  constructor(private notesService: NotesService, private store: Store, private toastService: ToastService) { }

  ngOnInit(): void {
    this.store.dispatch(loaderActions.startLoading({ loadingName: 'LOAD_NOTES' }));
    this.subscriptions.push(this.notesService.fetchNotes()
      .subscribe((notes: Note[]) => {
        this.store.dispatch(notesActions.loadNotes({ notes }));
        this.todo = notes.filter((note) => note.status === 'TO_DO');
        this.inProgress = notes.filter((note) => note.status === 'IN_PROGRESS');
        this.done = notes.filter((note) => note.status === 'DONE');
        this.store.dispatch(loaderActions.stopLoading({ loadingName: 'LOAD_NOTES' }));
      }, (error) => {
        this.store.dispatch(notesActions.saveApiError({ error: { type: 'GET', messages: error.error.messages } }));
        this.store.dispatch(loaderActions.stopLoading({ loadingName: 'LOAD_NOTES' }));
        this.toastService.show('Ocurrió un error al realizar tu solicitud', { classname: 'bg-danger text-light', delay: 3000, type: 'FAILURE' });
      }));
  }

  drop(event: CdkDragDrop<Note[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const todoNotes = this.todo.length;
      const inProgressNotes = this.inProgress.length;
      const doneNotes = this.done.length;
      this.store.dispatch(sortNotesActions.updateTodoNotes({ todoNotes }));
      this.store.dispatch(sortNotesActions.updateInProgressNotes({ inProgressNotes }));
      this.store.dispatch(sortNotesActions.updateDoneNotes({ doneNotes }));
      this.todo = this.todo.map((n) => ({
        ...n,
        status: 'TO_DO'
      }));
      this.inProgress = this.inProgress.map((n) => ({
        ...n,
        status: 'IN_PROGRESS'
      }));
      this.done = this.done.map((n) => ({
        ...n,
        status: 'DONE'
      }));
      this.store.dispatch(loaderActions.startLoading({ loadingName: 'PATCH_NOTES' }));
      this.subscriptions.push(
        this.notesService.patchManyNotes([
          ...this.todo,
          ...this.inProgress,
          ...this.done
        ]).subscribe((response) => {
          this.store.dispatch(loaderActions.stopLoading({ loadingName: 'PATCH_NOTES' }));
        }, (error) => {
          this.store.dispatch(notesActions.saveApiError({ error: { type: 'PATCH', messages: error.error.messages } }));
          this.store.dispatch(loaderActions.stopLoading({ loadingName: 'PATCH_NOTES' }));
          this.toastService.show('Ocurrió un error al realizar tu solicitud', { classname: 'bg-danger text-light', delay: 3000, type: 'FAILURE' });
        })
      )
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    })
  }


}