import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Note } from '../interfaces/note.interface';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) { }

  fetchNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${environment.notes}`);
  }

  deleteNote(id: string) {
    return this.http.delete(`${environment.notes}/${id}`);
  }

  saveNote(note: Partial<Note>) {
    return this.http.post<Note>(`${environment.notes}`, note);
  }

  fetchNoteById(id: string): Observable<Note> {
    return this.http.get<Note>(`${environment.notes}/${id}`);
  }

  patchNote(id: string, note: Partial<Note>) {
    return this.http.patch<Note>(`${environment.notes}/${id}`, note);
  }

  patchManyNotes(notes: Partial<Note>[]) {
    return this.http.patch<Note>(`${environment.notes}/patch-many`, notes);
  }

}
