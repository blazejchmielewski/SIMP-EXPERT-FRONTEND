import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Financial, UserDetails } from '../models/user.model';
import { ApiResponse } from '../models/forms.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  apiUrl = `${environment.apiUrl}/api/v1/admin`;

  getAllUsers():Observable<UserDetails[]>{
    return this.http.get<UserDetails[]>(`${this.apiUrl}/all`, {withCredentials: true});
  }

  getUserFinancialsByUuid(uuid: string):Observable<Financial[]>{
    return this.http.get<Financial[]>(`${this.apiUrl}/user-financials-by-uuid`, {
      params: {uuid},
      withCredentials: true
    })
  }

  blockUser(uuid: string):Observable<ApiResponse>{
    const body = { uuid };
    return this.http.post<ApiResponse>(`${this.apiUrl}/block`, body, {withCredentials: true})
  }

  unlockUser(uuid: string):Observable<ApiResponse>{
    const body = { uuid };
    return this.http.post<ApiResponse>(`${this.apiUrl}/unlock`, body, {withCredentials: true})
  }
}
