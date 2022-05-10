import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'my-notes-app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  state: any = null;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.subscriptions.push(this.store.pipe(
      map((state: any) => {
        return {
          ...state,
          user: {
            loggedUser: state?.user?.loggedUser
          }
        }
      })
    ).subscribe((state) => {
      this.state = state;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

}
