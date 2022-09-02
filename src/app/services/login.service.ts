import { Injectable } from '@angular/core';
import { Login } from '../mocks/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl: string = 'http://localhost:8080/login';

  constructor(private http: HttpClient) { }

  public login(user: string, pass: string){
    
  }

  public logout(){

  }
}
