import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Biography1 } from '../../mocks/biography';
import { BiographyService } from '../../services/biography.service';
import { WalkietalkieService } from '../../services/walkietalkie.service';

@Component({
  selector: 'app-modal-add-edit-biography',
  templateUrl: './modal-add-edit-biography.component.html',
  styleUrls: ['./modal-add-edit-biography.component.css']
})
export class ModalAddEditBiographyComponent implements OnInit {
  
  @Input() titleModal: string = "";
  @Input() formBiography: FormGroup;
  @Input() bio: Biography1 = new Biography1();

  @Output() onSubmitSuccess: EventEmitter<any> = new EventEmitter();

  mErrTitulo: string = "";
  mErrNombre: string = "";
  mErrApellido: string = "";
  mErrAcercade: string = "";
  mErrCorreo: string = "";
  mErrGithub: string = "";
  mErrLinkedin: string = "";

  constructor(
    private modalActive: NgbActiveModal, 
    private formBuilder: FormBuilder, 
    private service: BiographyService, 
    private comunicationService: WalkietalkieService) {
    //podria mandar la foto con el dato de foto
    this.formBiography = this.formBuilder.group({
      id: [0,[Validators.minLength(1),Validators.maxLength(10)]],
      titulo: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      nombre: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      apellido: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      acercade: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
      correo: ['',[Validators.required, Validators.maxLength(100), Validators.email]],
      linkedin: ['',[Validators.minLength(3), Validators.maxLength(100)]],
      github: ['',[Validators.minLength(3), Validators.maxLength(100)]],
    });
  }
  ngOnInit(): void { }

  //getters
  public get Titulo(){
    return this.formBiography.get('titulo');
  }
  public get Nombre(){
    return this.formBiography.get('nombre');
  }
  public get Apellido(){
    return this.formBiography.get('apellido');
  }
  public get Acercade(){
    return this.formBiography.get('acercade');
  }
  public get Correo(){
    return this.formBiography.get('correo');
  }
  public get Linkedin(){
    return this.formBiography.get('linkedin');
  }
  public get Github(){
    return this.formBiography.get('github');
  }

  //properties
  public get TituloValid(){
    return this.Titulo?.touched && !this.Titulo?.valid;
  }
  public get TituloError() {
    // console.log("propiedad");
    if (this.Titulo?.errors && this.Titulo?.touched) {
      // console.log("primer if");
      if(this.Titulo?.hasError('required')){
        // console.log("segundo if");
        this.mErrTitulo = "El titulo es requerido";
        return true;
      }
      if(this.Titulo?.errors?.['minlength'] || this.Titulo?.errors?.['maxlength']){
        this.mErrTitulo = "El titulo debe contener de 3 a 50 carateres";
        return true;
      }
    }
    return false;
  }

  public get NombreValid(){
    return this.Nombre?.touched && !this.Titulo?.valid;
  }
  public get NombreError() {
    if (this.Nombre?.errors && this.Nombre?.touched) {
      if (this.Nombre?.hasError('required')) {
        this.mErrNombre = "El nombre es requerido";
        return true;
      }
      if(this.Nombre?.errors?.['minlength'] || this.Nombre?.errors?.['maxlength']){
        this.mErrNombre = "El nombre debe contener de 3 a 100 carateres";
        return true;
      }
    }
    return false;
  }

  public get ApellidoValid(){
    return this.Apellido?.touched && !this.Apellido?.valid;
  }
  public get ApellidoError(){
    if (this.Apellido?.errors && this.Apellido?.touched) {
      if (this.Apellido?.hasError('required')) {
        this.mErrApellido = "El apellido es requerido";
        return true;
      }
      if(this.Apellido?.errors?.['minlength'] || this.Apellido?.errors?.['maxlength']){
        this.mErrApellido = "El apellido debe contener de 3 a 100 carateres";
        return true;
      }
    }
    return false;
  }

  public get AcercadeValid(){
    return this.Acercade?.touched && !this.Acercade?.valid;
  }
  public get AcercadeError(){
    if (this.Acercade?.errors && this.Acercade?.touched) {
      if (this.Acercade?.hasError('required')) {
        this.mErrAcercade = "La seccion acerca de tí es requerida";
        return true;
      }
      if(this.Acercade?.errors?.['minlength'] || this.Acercade?.errors?.['maxlength']){
        this.mErrAcercade = "La seccion acerca de tí debe contener de 3 a 500 carateres";
        return true;
      }
    }
    return false;
  }

  public get CorreoValid(){
    return this.Correo?.touched && !this.Correo?.valid;
  }
  public get CorreoError(){
    if (this.Correo?.errors && this.Correo?.touched) {
      if (this.Correo?.hasError('required')) {
        this.mErrCorreo = "El correo es requerido";
        return true;
      }
      if(this.Correo?.errors?.['minlength'] || this.Correo?.errors?.['maxlength']){
        this.mErrCorreo = "El correo debe contener de 3 a 100 carateres";
        return true;
      }
    }
    return false;
  }

  public get GithubValid(){
    return this.Github?.touched && !this.Github?.valid;
  }
  public get GithubError(){
    if (this.Github?.errors && this.Github?.touched) {
      if(this.Github?.errors?.['minlength'] || this.Github?.errors?.['maxlength']){
        this.mErrGithub = "La url de github debe contener de 3 a 100 carateres";
        return true;
      }
    }
    return false;
  }

  public get LinkedinValid(){
    return this.Linkedin?.touched && !this.Linkedin?.valid;
  }
  public get LinkedinError(){
    if (this.Linkedin?.errors && this.Linkedin?.touched) {
      if(this.Linkedin?.errors?.['minlength'] || this.Github?.errors?.['maxlength']){
        this.mErrLinkedin = "La url de Linkedin debe contener de 3 a 100 carateres";
        return true;
      }
    }
    return false;
  }

  onSubmit(event: Event){
    event.preventDefault();
    // console.log("var bio.id: "+this.bio.id);
    // console.log("id submit: "+this.formBiography.get('id'));
    let id: any = this.formBiography.get('id');
    let response: any;
    if (this.formBiography.valid){
      this.service.putBiography(id.value, this.formBiography.value).subscribe({
        next: (result) => {
          response = result;
          console.log("response: ");
          console.log(response);
        },
        error: (e) => {
          console.log("errorcito");
          console.log(e);
          // console.error(e.ok);
          console.log(e.ok);
        },
        complete: () => {
          this.comunicationService.actualizarBio(true);
          this.closeModal();
        }
      });
    }
    else {
      this.formBiography.markAllAsTouched();
      console.log(this.formBiography.value);
      console.log("el formulario es invalido");
    }
    
  }

  closeModal() {
    this.modalActive.close('Modal Closed');
  }

  dismissModal(){
    this.modalActive.dismiss('Cross click');
  }
}
