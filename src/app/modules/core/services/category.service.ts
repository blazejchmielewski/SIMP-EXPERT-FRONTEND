import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Category, CreateCategory, CreateSubCategory, Subcategory } from '../models/expertise.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/forms.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = `${environment.apiUrl}/api/v1/category`;
  
  constructor(private http: HttpClient) {}

  getAllCategories():Observable<Category[]>{
      return this.http.get<Category[]>(`${this.apiUrl}/all`)
    }
  
  getAllSubcategories():Observable<Subcategory[]>{
    return this.http.get<Subcategory[]>(`${this.apiUrl}/subcategory/all`)
  }

  createCategory(body: CreateCategory):Observable<ApiResponse>{
    return this.http.post<ApiResponse>(`${this.apiUrl}/create`, body, {withCredentials: true})
  }
  
  createSubCategory(body: CreateSubCategory):Observable<ApiResponse>{
    return this.http.post<ApiResponse>(`${this.apiUrl}/subcategory/create`, body, {withCredentials: true})
  }
}
