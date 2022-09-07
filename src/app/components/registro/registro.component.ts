import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UsuarioNuevo } from 'src/app/mocks/usuario-nuevo';
import { TokenService } from 'src/app/services/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  mErrResgistro: string = "";
  mErrUser: string = "";
  mErrPass: string = "";
  isLogged: boolean = false;
  isRegistred: boolean = false;
  isRegistredFail: boolean = false;
  formRegistro: FormGroup;
  usuarioNuevo: UsuarioNuevo = new UsuarioNuevo("","");

  constructor(
    private form: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService,
    private toastr: ToastrService
  ) { 
    this.formRegistro = this.form.group({
      usuario: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      contrasena: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    });
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()){
      this.isLogged = true;
    }
  }

  public get User(){
    return this.formRegistro.get('usuario');
  }
  public get Pass(){
    return this.formRegistro.get('contrasena');
  }

  public get UserValid(){
    return this.User!.touched && !this.User!.valid;
  }
  public get UserError(){
    if (this.User!.touched && this.User!.errors) {
      if (this.User!.hasError('required')){
        this.mErrUser = "El usuario es requerido";
        return true;
      }
      if (this.User!.errors?.['minlength'] || this.User!.errors?.['maxlength']){
        this.mErrUser = "El usuario debe contener entre 4 y 16 caracteres";
        return true;
      }
    }
    return false;
  }

  public get PassValid(){
    return this.Pass!.touched && !this.Pass!.valid;
  }
  public get PassError(){
    if (this.Pass!.touched && this.Pass!.errors) {
      if (this.Pass!.hasError('required')){
        this.mErrPass = "La contraseña es requerida";
        return true;
      }
      if (this.Pass!.errors?.['minlength'] || this.Pass!.errors?.['maxlength']){
        this.mErrPass = "La contraseña debe contener entre 8 y 16 caracteres";
        return true;
      }
    }
    return false;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.formRegistro.valid){
      console.log("el formulario es valido");
      console.log(this.formRegistro.value);
      //instancio el la clase login
      this.usuarioNuevo = new UsuarioNuevo(this.User!.value, this.Pass!.value);
      console.log(this.usuarioNuevo);
      //enviamos al authService
      this.authService.nuevoUsuario(this.usuarioNuevo).subscribe({
        next: (result: any) => {
          console.log("result: ");
          console.log(result);
          this.isRegistred = true;
          this.isRegistredFail = false;
          this.toastr.success('Cuenta Creada', 'Bien', {
            timeOut: 3000, positionClass: 'toast-bottom-right'
          });
          this.router.navigate(['/login']);
        },
        error: (e: any) => {
          console.log("error: ");
          console.log(e);

          this.isRegistred = false;
          this.isRegistredFail = true;
          //asumo que esto no funcionara porque no tengo la clase mensaje en el backend
          this.mErrResgistro = e.error;

          this.toastr.error(this.mErrResgistro, 'Error', {
            timeOut: 3000,  positionClass: 'toast-bottom-right',
          });
        }, 
        complete: () => {
          console.log("complete");
        }
      });
    }
    else {
      this.formRegistro.markAllAsTouched();
      console.log("el formulario es invalido");
      console.log(this.formRegistro.value);
      console.log(this.formRegistro.errors);
    }
  }
}