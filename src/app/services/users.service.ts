import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUserCredentials(): { accessToken: string, refreshToken: string, user: Partial<User> } | null {
    try {
      const user = localStorage.getItem('loggedUser') || null;
      const accessToken = localStorage.getItem('accessToken') || null;
      const refreshToken = localStorage.getItem('refreshToken') || null;
      if (user && accessToken && refreshToken) return { accessToken, refreshToken, user: JSON.parse(user) };
      return null;
    }
    catch (e) {
      return null;
    }
  }

  login(userCredentials: Partial<User>): Observable<{ accessToken: string, refreshToken: string, user: Partial<User> }> {
    return this.http.post<{ accessToken: string, refreshToken: string, user: Partial<User> }>(`${environment.users}/login`, userCredentials);
  }

  signUp(userCredentials: Partial<User>): Observable<{ accessToken: string, refreshToken: string, user: Partial<User> }> {
    return this.http.post<{ accessToken: string, refreshToken: string, user: Partial<User> }>(`${environment.users}/signup`, userCredentials);
  }

}
