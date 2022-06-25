import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

// import { AuthService } from '../auth.service';

@Component({
  selector: 'app-content',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  form:FormGroup;
  // email:string = "";
  // password:string = "";
  // username:string = "";

  // inyectar en el constructor el formBuilder
  constructor(/*private authService: AuthService,*/ private formBuilder: FormBuilder) {
    // crear el grupo de controladores para el formulario login
    this.form =  this.formBuilder.group({
      pass:['',[Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      mail:['',[Validators.required, Validators.email]],
      username:['',[Validators.required, Validators.minLength(5), Validators.maxLength(12)]]
    })
  }
  
  // public set Email(value: string) {
  //   this.email = value;
  // }
  // public get Email(): string {
  //   return this.email;
  // }
  
  public get Mail() {
    return this.form.get("mail");
  }
  
  // public set UserName(value : string) {
  //   this.username = value;
  // }
  // public get UserName() : string {
  //   return this.username;
  // }
  
  public get Username() {
    return this.form.get("username");
  }
  
  // public set Password(value : string) {
  //   this.password = value;
  // }
  // public get Password() : string {
  //   return this.password;
  // }
  
  public get Password() {
    return this.form.get("pass");
  }

  public get PasswordValid() {
    return this.Password?.touched && !this.Password?.valid;
  }

  public get MailValid() {
    return this.Mail?.touched && !this.Mail?.valid;
  }
  
  public get UsernameValid() {
    return this.Username?.touched && !this.Username?.valid;
  }
  
  public get FormValid() {
    return this.form?.invalid;
  }
  public onEnviar(event: Event) {
    // Detenemos la propagación o ejecución del compotamiento submit de un form
    event.preventDefault();
    if (this.form.valid) {
      // Llamamos a nuestro servicio para enviar los datos al servidor
      // También podríamos ejecutar alguna lógica extra
      alert("Todo salio bien ¡Enviar formuario!")
    } else {
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template
      this.form.markAllAsTouched();
    }
  }

  // login() {
  //   //en el servicio authservice ya redirecciona si hay datos de sesion
  //   this.authService.login(this.email, this.password);
  // }

  ngOnInit(): void { }
}
