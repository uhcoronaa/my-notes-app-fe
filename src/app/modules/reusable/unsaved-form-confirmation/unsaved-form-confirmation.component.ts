import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'my-notes-app-unsaved-form-confirmation',
  templateUrl: './unsaved-form-confirmation.component.html',
  styleUrls: ['./unsaved-form-confirmation.component.css']
})
export class UnsavedFormConfirmationComponent implements OnInit {

  @Input() title: string = '';
  @Input() message: string = '';
  
  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  closeModal(value: boolean): void {
    this.activeModal.close(value);
  }

}
