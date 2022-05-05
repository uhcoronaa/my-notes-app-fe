import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { concatMap, from, map, Observable, of } from 'rxjs';
import { UnsavedFormConfirmationComponent } from '../reusable/unsaved-form-confirmation/unsaved-form-confirmation.component';
import * as unsavedFormsSelectors from '../specific/unsaved-forms/unsaved-forms.selectors';

@Injectable({
  providedIn: 'root'
})
export class UnsavedFormsGuard implements CanActivate {

  constructor(private store: Store, private modalService: NgbModal) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(unsavedFormsSelectors.unsavedForms).pipe(
      concatMap((unsaved) => {
        if (!unsaved) {
          const modalRef = this.modalService.open(UnsavedFormConfirmationComponent, { centered: true });
          modalRef.componentInstance.title = 'Unsaved Changes';
          modalRef.componentInstance.message = 'Are you sure you want to leave this page?. There are unsaved changes in your forms.';
          return modalRef.result;
        }
        return of(unsaved);
      })
    )
  }

}