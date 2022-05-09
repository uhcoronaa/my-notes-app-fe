import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Category } from 'src/app/interfaces/categories.interface';
import { Note } from 'src/app/interfaces/note.interface';
import * as unsavedFormActions from '../../specific/unsaved-forms/unsaved-forms.actions';
import * as notesSelectors from '../../specific/notes/state/notes.selectors';
import * as notesActions from '../../specific/notes/state/notes.actions';

@Component({
  selector: 'my-notes-app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent implements OnInit {

  @Input() formType: 'edit' | 'create' = 'create';
  @Input() note: Note | null = null;
  @Input() categories: Category[] = [];
  @Output() saveEvent: EventEmitter<Partial<Note>> = new EventEmitter();
  @Output() cancelEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(private fb: FormBuilder, private store: Store) { }

  errorsObservable = this.store.select(notesSelectors.errors);

  form: FormGroup = new FormGroup({});
  duplicatedNote: boolean = false;

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.note ? this.note.name : null, [Validators.required]],
      description: [this.note ? this.note.description : null, [Validators.required]],
      category: [this.note ? this.note.category : this.categories.length ? this.categories[0].name : null, [Validators.required]],
      image: [this.note ? this.note.image : null, []],
      status: [this.note ? this.note.status : 'TO_DO', [Validators.required]]
    });
    this.store.dispatch(unsavedFormActions.formInitialized({ formId: 'NOTE_FORM', value: this.form.value }));
    this.form.valueChanges.subscribe((value) => {
      this.store.dispatch(notesActions.resetApiErrors());
      this.store.dispatch(unsavedFormActions.formValueChanged({ formId: 'NOTE_FORM', value }));
    });
    this.errorsObservable.subscribe((errors) => {
      this.duplicatedNote = errors.some((e) => e.messages.some((e2) => e2 === 'DUPLICATED_NOTE'));
    });
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.saveEvent.emit(this.form.value);
    }
  }

  cancel(): void {
    this.store.dispatch(notesActions.resetApiErrors());
    this.cancelEvent.emit(true);
  }

  handleImageChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    const imageControl = this.form.get('image');
    reader.readAsDataURL(file);
    reader.onload = function () {
      imageControl?.patchValue(reader.result?.toString());
    };
  }

}
