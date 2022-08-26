import { Injectable } from '@angular/core';
import { Project } from '../mocks/projects';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type":"application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = "http://localhost:8080/proyecto";

  constructor(private http: HttpClient) { }

  public getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl + "/traer");
  }

  public postProject(datos: any): Observable<Project> {
    return this.http.post<Project>(this.apiUrl + "/crear", datos);
  }

  public putProject(id: any, datos: any): Observable<Project> {
    return this.http.put<Project>(this.apiUrl + `/editar/${id}`,{}, {
      params: {
        nombre: datos.nombre,
        descripcion: datos.descripcion,
        sitio: datos.sitio,
        enlace: datos.enlace,
        desde: datos.desde,
        hasta: datos.hasta,
        usuarios_id: datos.usuarios_id
      }
    });
  }

  public deleteProject(id: any): Observable<Project> {
    return this.http.delete<Project>(
      this.apiUrl + `/borrar/${id}`,
      httpOptions
    );
  }

  public setProjectImage(id: any, data: FormData): Observable<any>{
    return this.http.put(this.apiUrl + `/agregarImg/${id}`, data);
  }

  public deleteProjectImage(id: any){
    return this.http.delete(this.apiUrl + `/borrarImg/${id}`);
  }
}
