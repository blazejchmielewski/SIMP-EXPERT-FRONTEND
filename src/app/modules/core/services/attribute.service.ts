import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Attribute, AttributeType, BasicResponse, CreateAttributeType, Units } from '../models/expertise.model';
import { CreateAttibuteRequest } from '../models/forms.model';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  apiUrl = `${environment.apiUrl}/api/v1/attribute`;
  
  constructor(private http: HttpClient) { }

  getAllAttributeTypes():Observable<AttributeType[]>{
    return this.http.get<AttributeType[]>(`${this.apiUrl}/attribute-types`, {withCredentials: true});
  }

  getUnitsForAttributeType(name: string):Observable<Units[]>{
    const param = new HttpParams().set('name', name);
    return this.http.get<Units[]>(`${this.apiUrl}/units-for-attribute-type`, {params: param})
  }

  createAttributeType(body: CreateAttributeType):Observable<BasicResponse>{
    console.log(body)
    return this.http.post<BasicResponse>(`${this.apiUrl}/attribute-type/create`, body, {withCredentials:true})
  }

  validateAttribute(body: Attribute):Observable<BasicResponse>{
    return this.http.post<BasicResponse>(`${this.apiUrl}/validate`, body, {withCredentials:true})
  }
}
