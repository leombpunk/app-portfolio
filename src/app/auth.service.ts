import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api = 'https://localhost:3000/api'; //la url que corresponda en cada caso
  token:any; 
  constructor(private http:HttpClient, private router:Router) { }
  login(email:string, password:string) {
    this.http.post(this.api + '/authenticate', {email:email, password:password})
      .subscribe((resp:any)=>{
        //redireccionamos al usuario a su perfil
        this.router.navigate(['profile']);
        // se guarda el token de manera local
        localStorage.setItem('auth_token', resp.token);
      });
  }
  //al cerrar la sesion borramos el token localmente
  logout(){
    localStorage.removeItem('auth_token');
  }
  //un servicio para verificar si existe la sesion
  public logIn():boolean { 
    return (localStorage.getItem('auth_token') !== null);
  }
}
