import { Injectable } from '@angular/core';
import { BaseResponse, UserDetails, UserEditData } from '../models/user.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthResponse, User } from '../models/auth.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<UserDetails | null>(null);
  user$ = this.userSubject.asObservable();

  apiUrl = `${environment.apiUrl}/api/v1/user`;
  constructor(private http: HttpClient) { }

  // getTestUser(): Observable<UserDetails>{
  //   const id = 1
  //   return this.http.get<UserDetails>(`${this.apiUrl}/test/${id}`,)
  // }

  editUser(body: UserEditData): Observable<BaseResponse> {
    return this.http.put<BaseResponse>(`${this.apiUrl}/update`, body,
      {withCredentials: true}
    );
  }
  
  getUserDetails():Observable<UserDetails>{
    return this.http.get<UserDetails>(`${this.apiUrl}/user-info`,
      {withCredentials: true}
    )
  }

  setUser(user: UserDetails) {
    this.userSubject.next(user);
  }

  getUser(): UserDetails | null {
    return this.userSubject.getValue();
  }
}
