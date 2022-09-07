import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { Login } from 'src/app/mocks/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  mErrUser: string = "";
  mErrPass: string = "";
  mErrTokenService: string = "";

  isLogged: boolean = false;
  isLogginFail: boolean = false;
  login: Login = new Login("","");

  roles: string[] = [];

  constructor(
    private form: FormBuilder,
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
    ) {
    this.formLogin = this.form.group({
      usuario: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      contrasena: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    });
  }

  ngOnInit(): void {
    //comprobar si se esta loggeado
    if (this.tokenService.getToken()){
      this.isLogged = true;
      this.isLogginFail = false;
      this.roles = this.tokenService.getAuthorities();
      this.router.navigate([`/home/${this.tokenService.getUserName()}`]);
    }
  }

  public get User(){
    return this.formLogin.get('usuario');
  }
  public get Pass(){
    return this.formLogin.get('contrasena');
  }

  public get UserValid(){
    return this.User!.touched && !this.User!.valid;
  }
  public get UserError(){
    if (this.User?.touched && this.User?.errors) {
      if (this.User?.hasError('required')){
        this.mErrUser = "El usuario es requerido";
        return true;
      }
      if (this.User?.errors?.['minlength'] || this.User?.errors?.['maxlength']){
        this.mErrUser = "El usuario debe contener entre 4 y 16 caracteres";
        return true;
      }
    }
    return false;
  }

  public get PassValid(){
    return this.Pass?.touched && !this.Pass?.valid;
  }
  public get PassError(){
    if (this.Pass?.touched && this.Pass?.errors) {
      if (this.Pass?.hasError('required')){
        this.mErrPass = "La contraseña es requerida";
        return true;
      }
      if (this.Pass?.errors?.['minlength'] || this.Pass?.errors?.['maxlength']){
        this.mErrPass = "La contraseña debe contener entre 8 y 16 caracteres";
        return true;
      }
    }
    return false;
  }

  //onLogin
  onSubmit(event: Event){ 
    event.preventDefault();
    if (this.formLogin.valid){
      console.log("el formulario es valido");
      console.log(this.formLogin.value);
      //instancio el la clase login
      this.login = new Login(this.User!.value, this.Pass!.value);
      console.log(this.login);
      //enviamos al authService
      this.authService.login(this.login).subscribe({
        next: (result: any) => {
          console.log("result: ");
          console.log(result);
          this.isLogged = true;
          this.isLogginFail = false;

          this.tokenService.setToken(result.token);
          this.tokenService.setUserName(result.usuario);
          this.tokenService.setAuthorities(result.authorities);
          this.roles = result.authorities;
          // console.log(this.tokenService.getUserName());
          //redireccionar a la home, en un futuro me gustaria redireccionar al perfil del usuario logeado
          this.router.navigate([`/home/${this.tokenService.getUserName()}`]);
        },
        error: (e: any) => {
          console.log("error: ");
          console.log(e);

          this.isLogged = false;
          this.isLogginFail = true;

          //asumo que esto no funcionara porque no tengo la clase mensaje en el backend
          this.mErrTokenService = e.error.message;
          console.log(this.mErrTokenService);
        }, 
        complete: () => {
          console.log("complete");
        }
      });
    }
    else {
      this.formLogin.markAllAsTouched();
      console.log("el formulario es invalido");
      console.log(this.formLogin.value);
      console.log(this.formLogin.errors);
    }
  }
}