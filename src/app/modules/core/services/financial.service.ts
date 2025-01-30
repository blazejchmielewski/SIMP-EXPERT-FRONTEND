import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Currency } from '../models/expertise.model';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {

  apiUrl = `${environment.apiUrl}/api/v1/financial`;
  constructor(private http: HttpClient) { }

  getCurrencyByName(name: string):Observable<Currency>{
    const param = new HttpParams().append('name', name);
    return this.http.get<Currency>(`${this.apiUrl}/get-currency`, {params: param, withCredentials: true})
  }

  getAllCurriencies():Observable<Currency[]>{
    return this.http.get<Currency[]>(`${this.apiUrl}/get-currencies`, {withCredentials: true})
  }
}
