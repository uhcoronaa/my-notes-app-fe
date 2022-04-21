import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Category } from 'src/app/interfaces/categories.interface';
import { Note } from 'src/app/interfaces/note.interface';
import { CategoriesService } from 'src/app/services/categories.service';
import { NotesService } from 'src/app/services/notes.service';
import * as notesActions from '../state/notes.actions';

@Component({
  selector: 'my-notes-app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {

  editNote: Note | null = null;
  categories: Category[] | null = null;

  constructor(private notesService: NotesService, private activatedRoute: ActivatedRoute, private store: Store, private router: Router, private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.notesService.fetchNoteById(this.activatedRoute.snapshot.params['id']).subscribe((note: Note) => {
      this.editNote = note;
    });
    this.categoriesService.fetchCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  edit(note: Partial<Note>) {
    if (this.editNote?._id) {
      this.notesService.patchNote(this.editNote._id, note).subscribe((note) => {
        if (this.editNote?._id) {
          this.store.dispatch(notesActions.updateNote({ id: this.editNote._id, note }));
          this.router.navigate(['specific', 'notes']);
        }
      })
    }
  }

  cancel(status: boolean) {
    if (status) {
      this.router.navigate(['specific', 'notes']);
    }
  }

}
