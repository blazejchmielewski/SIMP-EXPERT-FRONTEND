import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthResponse, ChangePasswordData, IUser, LoggedInResponse, LoginData, RegisterData, ToResetPasswordData } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = `${environment.apiUrl}/api/v1/auth`;

  constructor(private http: HttpClient) { }

  register(body: RegisterData): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, body);
  }

  login(body: LoginData): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.apiUrl}/authenticate`, body,
      {withCredentials: true}
    );
  }

  activateAccount(uid: string): Observable<AuthResponse>{
    const params = new HttpParams().append('uid', uid);
    return this.http.get<AuthResponse>(`${this.apiUrl}/activate`, {
      params
    });
  }

  logout(): Observable<AuthResponse>{
    return this.http.get<AuthResponse>(`${this.apiUrl}/logout`,
      {withCredentials: true}
    );
  }

  toResetPassword(body: ToResetPasswordData): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.apiUrl}/reset-password`, body);
  }

  changePassword(body: ChangePasswordData): Observable<AuthResponse>{
    return this.http.put<AuthResponse>(`${this.apiUrl}/change-password`, body);
  } 

  autoLogin(): Observable<AuthResponse>{
    return this.http.get<AuthResponse>(`${this.apiUrl}/auto-login`,
      {withCredentials: true}
    );
  }

  isLoggedIn(): Observable<LoggedInResponse>{
    return this.http.get<LoggedInResponse>(`${this.apiUrl}/logged-in`,
      {withCredentials: true}
    );
  } 
}
