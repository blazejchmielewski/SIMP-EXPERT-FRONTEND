import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Currency, CurrencyRate, DevaluationCause, ApiResponse } from '../models/expertise.model';


@Injectable({
  providedIn: 'root'
})
export class FinancialService {

  apiUrl = `${environment.apiUrl}/api/v1/financial`;
  constructor(private http: HttpClient) { }

  getCurrencRateByCode(code: string):Observable<CurrencyRate>{
    const param = new HttpParams().append('code', code);
    return this.http.get<CurrencyRate>(`${this.apiUrl}/get-currency-rate`, {params: param, withCredentials: true})
  }

  getAllCurriencies():Observable<Currency[]>{
    return this.http.get<Currency[]>(`${this.apiUrl}/get-currencies`, {withCredentials: true})
  }

  getAllDevaluationCauses():Observable<ApiResponse<DevaluationCause[]>>{
    return this.http.get<ApiResponse<DevaluationCause[]>>(`${this.apiUrl}/get-devaluation-causes`, {withCredentials: true})
  }
}
