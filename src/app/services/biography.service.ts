import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Biography } from '../mocks/biography';
import { Biography1 } from '../mocks/prueba';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BiographyService {
  private apiUrl: string = 'http://localhost:8080/perfil';

  constructor(private http: HttpClient) {}

  //get
  public getBiography(): Observable<Biography1> {
    return this.http.get<Biography1>(this.apiUrl + '/buscar/1');
  }

  //delete
  public deleteBiography(id: any): Observable<Biography1> {
    return this.http.delete<Biography1>(
      this.apiUrl + `/borrar/${id}`,
      httpOptions
    );
  }

  //put
  public putBiography(id: any, data: any): Observable<Biography1> {
    // console.log('desde servicio<put>: ' + data.id + ' ' + data.nombre);
    return this.http.put<Biography1>(
      this.apiUrl + `/editar/${id}`,
      {},
      {
        params: {
          nombre: data.nombre,
          apellido: data.apellido,
          titulo: data.titulo,
          correo: data.correo,
          acercade: data.acercade,
          github: data.github,
          linkedin: data.linkedin,
        }
      }
    );
  }
  // public putBiography(id:any, data:any): Observable<Biography1>{
  //   return this.http.put<Biography1>(this.apiUrl + `/editar/${id}`, data, httpOptions);
  // }
}
