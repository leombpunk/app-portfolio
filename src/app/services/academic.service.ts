import { Injectable } from '@angular/core';

import { Academics } from '../mocks/academic';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type":"application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class AcademicService {

  private apiUrl: string = "http://localhost:8080/educacion";

  constructor(private http: HttpClient) { }

  public getAcademics(): Observable<Object> {
    return this.http.get(this.apiUrl+"/traer");
  }
}
