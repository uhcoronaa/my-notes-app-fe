import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

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
    this.subscriptions.push(this.store.subscribe((state) => {
      this.state = state;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

}
