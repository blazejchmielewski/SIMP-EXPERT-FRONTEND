import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UnitType } from '../models/attribute.model';
import { BasicResponse } from '../models/expertise.model';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  apiUrl = `${environment.apiUrl}/api/v1/unit`;

  constructor(private http: HttpClient) { }

  getAllUnits():Observable<UnitType[]>{
    return this.http.get<UnitType[]>(`${this.apiUrl}/get-all`, { withCredentials: true });
  }

  getUnitsByType(id: string):Observable<BasicResponse>{
    const param = new HttpParams().set("id", id);
    return this.http.get<BasicResponse>(`${this.apiUrl}/units-by-type`, {params: param, withCredentials: true})
  }
}
