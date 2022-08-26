import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AcademicService } from '../../services/academic.service';
import { Academics } from 'src/app/mocks/academic';
import { WalkietalkieService } from 'src/app/services/walkietalkie.service';

@Component({
  selector: 'app-modal-add-edit-academic',
  templateUrl: './modal-add-edit-academic.component.html',
  styleUrls: ['./modal-add-edit-academic.component.css']
})
export class ModalAddEditAcademicComponent implements OnInit {

  mErrTitulo: string = "";
  mErrInstituto: String = "";
  mErrLocacion: string = "";
  mErrHabilidades: string = "";
  mErrDesde: string = "";
  mErrHasta: string = "";
  
  formAcademic: FormGroup;

  @Input() titleModal: string = "";
  @Input() usuario_id: number = 0;
  @Input() academ: Academics = new Academics();

  constructor(
    private modalActive: NgbActiveModal, 
    private formBuilder: FormBuilder, 
    private service: AcademicService,
    private comunicationService: WalkietalkieService) 
  { 
    this.formAcademic = this.formBuilder.group({
      id: [0,[Validators.required, Validators.minLength(1), Validators.maxLength(10)]], //, Validators.pattern(/^\d{1,10}$/g)
      titulo: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      institucion: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      locacion: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      habilidades: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
      desde: ['',[Validators.required]],
      hasta: ['',[Validators.required]],
      usuarios_id: [0,[Validators.minLength(1), Validators.maxLength(10)]]
    });
  }

  ngOnInit(): void { 
    // console.log("init (usuarios_id): ");
    // console.log(this.usuario_id);
  }

  //getters
  public get Titulo(){
    return this.formAcademic.get('titulo');
  }
  public get Institucion(){
    return this.formAcademic.get('institucion');
  }
  public get Locacion(){
    return this.formAcademic.get('locacion');
  }
  public get Habilidades(){
    return this.formAcademic.get('habilidades');
  }
  public get Desde(){
    return this.formAcademic.get('desde');
  }
  public get Hasta(){
    return this.formAcademic.get('hasta');
  }
  //metodos
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

  public get InstitucionValid(){
    return this.Institucion?.touched && !this.Institucion?.valid;
  }
  public get InstitucionError(){
    if (this.Institucion?.errors && this.Institucion?.touched){
      if(this.Institucion?.hasError('required')){
        this.mErrInstituto = "El campo Institucion es requerido";
        return true;
      }
      if(this.Institucion?.errors?.['minlength'] || this.Institucion?.errors?.['maxlength']){
        this.mErrInstituto = "La Institucion debe contener de 3 a 50 carateres";
        return true;
      }
    }
    return false;
  }

  public get LocacionValid(){
    return this.Locacion?.touched && !this.Locacion?.valid;
  }
  public get LocacionError(){
    if (this.Locacion?.errors && this.Locacion?.touched){
      if(this.Locacion?.hasError('required')){
        this.mErrLocacion = "El campo Locacion es requerido";
        return true;
      }
      if(this.Locacion?.errors?.['minlength'] || this.Locacion?.errors?.['maxlength']){
        this.mErrLocacion = "La Locacion debe contener de 3 a 50 carateres";
        return true;
      }
    }
    return false;
  }

  public get HabilidadesValid(){
    return this.Habilidades?.touched && !this.Habilidades?.valid;
  }
  public get HabilidadesError(){
    if (this.Habilidades?.errors && this.Habilidades?.touched){
      if (this.Habilidades?.hasError('required')){
        this.mErrHabilidades = "El campo Habilidades es requerido";
        return true;
      }
      if(this.Habilidades?.errors?.['minlength'] || this.Habilidades?.errors?.['maxlength']){
        this.mErrHabilidades = "El campo Habilidades debe contener de 5 a 500 carateres";
        return true;
      }
    }
    return false;
  }

  public get DesdeValid(){
    return this.Desde?.touched && !this.Desde?.valid;
  }
  public get DesdeError(){
    if (this.Desde?.errors && this.Desde?.touched){
      if(this.Desde?.hasError('required')){
        this.mErrDesde = "El campo Desde es requerido";
        return true;
      }
    }
    return false;
  }

  public get HastaValid(){
    return this.Hasta?.touched && !this.Hasta?.valid;
  }
  public get HastaError(){
    if (this.Hasta?.errors && this.Hasta?.touched){
      if(this.Hasta?.hasError('required')){
        this.mErrHasta = "El campo Hasta es requerido";
        return true;
      }
    }
    return false;
  }

  onSubmit(event: Event){
    event.preventDefault();
    // console.log(this.Habilidades);
    if(this.formAcademic.valid){
      // console.log("form: ");
      console.log(this.formAcademic.value);
      console.log("el fomrulario es valido");
      if (this.academ.titulo !== ''){
        //entra cuando edito el registro
        let id: any = this.formAcademic.get('id');
        this.service.putAcademics(id.value, this.formAcademic.value).subscribe({
          next: (result: any) => {
            console.log("result: ");
            console.log(result);
          },
          error: (e: any) => {
            console.log("error: ");
            console.log(e);
          },
          complete: () => {
            this.comunicationService.actualizarAca(true);
            this.closeModal();
          }
        });
      }
      else { 
        this.formAcademic.patchValue({
          usuarios_id: this.usuario_id,
        });
        this.service.postAcademics(this.formAcademic.value).subscribe({
          next: (result: any) => {
            console.log("result: ");
            console.log(result);
          },
          error: (e: any) => {
            console.log("error: ");
            console.log(e);
          },
          complete: () => {
            this.comunicationService.actualizarAca(true);
            this.closeModal();
          }
        });
      }
    }
    else {
      this.formAcademic.markAllAsTouched();
      console.log(this.formAcademic.value);
      console.log("el formulario es invalido");
      console.log(this.formAcademic.errors);
    }
  }

  //modals
  closeModal() {
    this.modalActive.close('Modal Closed');
  }

  dismissModal(){
    this.modalActive.dismiss('Cross click');
  }
}
