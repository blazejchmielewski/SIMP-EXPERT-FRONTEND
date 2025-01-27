import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { BasicResponse, CreateExpertise, ExpertiseData, ExpertiseDetails, ExpertiseWithImage } from '../models/expertise.model';

@Injectable({
  providedIn: 'root'
})
export class ExpertiseService {

  apiUrl = `${environment.apiUrl}/api/v1/expertise`;

  constructor(private http: HttpClient) { }

  getExpertiseByUser(): Observable<ExpertiseWithImage[]> {
   return this.http.get<ExpertiseWithImage[]>(`${this.apiUrl}/get`, {withCredentials: true})
  }

  getExpertiseDetails(uuid: string): Observable<ExpertiseDetails>{
    return this.http.get<ExpertiseDetails>(`${this.apiUrl}/get/details/${uuid}`, {withCredentials: true})
  }

  getImageCount(uuid: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/get/image/count/${uuid}`);
  }
  
  getImage(uuid: string, index: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/get/image/${uuid}/${index}`, { responseType: 'blob' }).pipe(
      map((blob) => URL.createObjectURL(blob))
    );
  }

  createExpertise(expertise: CreateExpertise, files: File[], expFile: File): Observable<BasicResponse> {
    const formDataToSend = new FormData();
    formDataToSend.append('expertiseData', new Blob([JSON.stringify(expertise)], { type: 'application/json' }));
    if (files && files.length > 0) {
      for (const file of files) {
          formDataToSend.append('file', file, file.name);
      }
    }
    formDataToSend.append('expertiseFile', expFile, expFile.name);

    return this.http.post<BasicResponse>(`${this.apiUrl}/create`, formDataToSend, {
      withCredentials: true,
    });
  }
}