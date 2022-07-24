import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AcademicService } from '../../services/academic.service';

@Component({
  selector: 'app-modal-add-edit-academic',
  templateUrl: './modal-add-edit-academic.component.html',
  styleUrls: ['./modal-add-edit-academic.component.css']
})
export class ModalAddEditAcademicComponent implements OnInit {
  mErrTitulo: string = "";
  mErrInstituto: String = "";
  mErrLocacion: string = "";
  mErrDesde: string = "";
  mErrHasta: string = "";
  @Input() titleModal: string = "";
  formAcademic: FormGroup;
  date: Date = new Date();

  academic: Object = {};

  constructor(private modalActive: NgbActiveModal, private formBuilder: FormBuilder, private service: AcademicService) { 
    this.formAcademic = this.formBuilder.group({
      id: ['0',[Validators.required, Validators.minLength(1), Validators.maxLength(10), Validators.pattern(/^\d{1,11}$/g)]],
      titulo: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      institucion: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      locacion: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      desde: ['',[Validators.required]],
      hasta: ['',[Validators.required]]
    })
  }

  ngOnInit(): void { }

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
  public get Desde(){
    return this.formAcademic.get('desde');
  }
  public get Hasta(){
    return this.formAcademic.get('hasta');
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

  //modals
  closeModal() {
    this.modalActive.close('Modal Closed');
  }

  dismissModal(){
    this.modalActive.dismiss('Cross click');
  }

  //events
  onSubmit(event: Event){
    event.preventDefault();
    if(this.formAcademic.valid){
      //darle los datos al servicio
      console.log(this.formAcademic.value);
      console.log("el fomrulario es valido");
      console.log("servicio: "+this.service.getAcademics().subscribe((academic: any)=>{
        this.academic = academic;
      }));
    }
    else {
      this.formAcademic.markAllAsTouched();
      // alert("el formulario es invalido");
      console.log(this.formAcademic.value);
      console.log("el formulario es invalido");
    }
  }
}
