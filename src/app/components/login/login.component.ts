import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  mErrUser: string = "";
  mErrPass: string = "";

  constructor(private form: FormBuilder) {
    this.formLogin = this.form.group({
      user: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      pass: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    });
  }

  ngOnInit(): void {
  }

  public get User(){
    return this.formLogin.get('user');
  }
  public get Pass(){
    return this.formLogin.get('pass');
  }

  public get UserValid(){
    return this.User?.touched && !this.User?.valid;
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

  onSubmit(event: Event){
    event.preventDefault();
    if (this.formLogin.valid){
      console.log("el formulario es valido");
      console.log(this.formLogin.value);
    }
    else {
      this.formLogin.markAllAsTouched();
      console.log("el formulario es invalido");
      console.log(this.formLogin.value);
      console.log(this.formLogin.errors);
    }
  }

}
