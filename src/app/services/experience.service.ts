import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Experience } from '../mocks/experience';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private apiUrl: string = "http://localhost:8080/experiencia";

  constructor(private http: HttpClient) { }

  //get
  public getExperiences(): Observable<Experience[]> {
    return this.http.get<Experience[]>(this.apiUrl + "/traer");
  }
}
