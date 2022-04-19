import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../interfaces/categories.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  fetchCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.categories}`);
  }

  deleteCategory(id: string) {
    return this.http.delete(`${environment.categories}/${id}`);
  }

  saveCategory(category: Partial<Category>) {
    return this.http.post<Category>(`${environment.categories}`, category);
  }

  fetchById(id: string): Observable<Category> {
    return this.http.get<Category>(`${environment.categories}/${id}`);
  }

  patchCategory(id: string, category: Partial<Category>) {
    return this.http.patch<Category>(`${environment.categories}/${id}`, category);
  }

}
