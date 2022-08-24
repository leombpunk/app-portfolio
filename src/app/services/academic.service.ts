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

  public getAcademics(): Observable<Academics[]> {
    return this.http.get<Academics[]>(this.apiUrl + "/traer");
  }

  public postAcademics(datos: any): Observable<Academics> {
    return this.http.post<Academics>(this.apiUrl + "/crear", datos);
  }

  public putAcademics(id: any, datos: any): Observable<Academics> {
    return this.http.put<Academics>(this.apiUrl + `/editar/${id}`,{}, {
      params: {
        titulo: datos.titulo,
        institucion: datos.institucion,
        locacion: datos.locacion,
        habilidades: datos.habilidades,
        desde: datos.desde,
        hasta: datos.hasta,
        usuarios_id: datos.usuarios_id
      }
    });
  }

  public setAcademImage(id: any, data: FormData): Observable<any>{
    return this.http.put(this.apiUrl + `/agregarImg/${id}`, data);
  }

}
