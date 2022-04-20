import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/interfaces/categories.interface';
import { Note } from 'src/app/interfaces/note.interface';

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

  constructor(private fb: FormBuilder) { }

  form: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.note?.name || null, [Validators.required]],
      description: [this.note?.description || null, [Validators.required]],
      category: [this.note?.category || this.categories[0].name || null, [Validators.required]],
      image: [this.note?.image || null, []],
      status: [this.note?.status || 'TO_DO', [Validators.required]]
    });
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.saveEvent.emit(this.form.value);
    }
  }

  cancel(): void {
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
