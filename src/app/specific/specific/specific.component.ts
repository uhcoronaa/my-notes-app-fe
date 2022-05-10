import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Note } from 'src/app/interfaces/note.interface';
import { NotesService } from 'src/app/services/notes.service';
import * as userActions from '../../users/state/users.actions';
import * as sortNotesActions from '../sort-notes/state/sort-notes.actions';
import * as sortNotesSelectors from '../sort-notes/state/sort-notes.selectors';
import * as loaderActions from '../loader/loader.actions';
import { ToastService } from 'src/app/services/toast.service';
import * as notesActions from '../notes/state/notes.actions';
import * as userSelectors from '../../users/state/users.selectors';

@Component({
  selector: 'my-notes-app-specific',
  templateUrl: './specific.component.html',
  styleUrls: ['./specific.component.css']
})
export class SpecificComponent implements OnInit, OnDestroy {

  todoNotesObservable = this.store.select(sortNotesSelectors.todoNotes);
  inProgressNotesObservable = this.store.select(sortNotesSelectors.inProgressNotes);
  doneNotesObservable = this.store.select(sortNotesSelectors.doneNotes);
  loggedUserObservable = this.store.select(userSelectors.loggedUser);
  subscriptions: Subscription[] = [];
  showOutlet: boolean = false;

  constructor(private store: Store, private router: Router, private notesService: NotesService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.store.dispatch(loaderActions.startLoading({ loadingName: 'LOAD_NOTES' }));
    this.subscriptions.push(this.notesService.fetchNotes()
      .subscribe((notes: Note[]) => {
        const todoNotes = notes.filter((n) => n.status === 'TO_DO').length;
        const inProgressNotes = notes.filter((n) => n.status === 'IN_PROGRESS').length;
        const doneNotes = notes.filter((n) => n.status === 'DONE').length;
        this.store.dispatch(sortNotesActions.updateTodoNotes({ todoNotes }));
        this.store.dispatch(sortNotesActions.updateInProgressNotes({ inProgressNotes }));
        this.store.dispatch(sortNotesActions.updateDoneNotes({ doneNotes }));
        this.store.dispatch(loaderActions.stopLoading({ loadingName: 'LOAD_NOTES' }));
      }, (error) => {
        this.store.dispatch(notesActions.saveApiError({ error: { type: 'GET', messages: error.error.messages } }));
        this.store.dispatch(loaderActions.stopLoading({ loadingName: 'LOAD_NOTES' }));
        this.toastService.show('Ocurrió un error al realizar tu solicitud', { classname: 'bg-danger text-light', delay: 3000, type: 'FAILURE' });
      }));
  }

  logout(): void {
    this.store.dispatch(userActions.accessTokenUpdated({ accessToken: null }));
    this.store.dispatch(userActions.refreshTokenUpdated({ refreshToken: null }));
    this.store.dispatch(userActions.loggedUserUpdated({ loggedUser: null }));
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    })
  }

  onActivate(event: any) {
    this.showOutlet = true;
  }

  onDeactivate(event: any) {
    this.showOutlet = false;
  }

  checkProfile():void{
    this.router.navigate(['specific', 'profile']);
  }

  changePassword():void{
    this.router.navigate(['specific', 'profile', 'change-password']);
  }

}
