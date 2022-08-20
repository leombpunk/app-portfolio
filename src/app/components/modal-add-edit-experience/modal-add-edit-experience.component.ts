import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ExperienceService } from '../../services/experience.service';
import { WalkietalkieService } from '../../services/walkietalkie.service';
import { Experience } from '../../mocks/experience';

@Component({
  selector: 'app-modal-add-edit-experience',
  templateUrl: './modal-add-edit-experience.component.html',
  styleUrls: ['./modal-add-edit-experience.component.css']
})
export class ModalAddEditExperienceComponent implements OnInit {

  @Input() titleModal: string = '';
  @Input() formExperience: FormGroup;
  @Input() expe: Experience = new Experience();

  mErrCargo: string = "";
  mErrEmpresa: string = "";
  mErrDesde: string = "";
  mErrHasta: string = "";
  mErrReftel: string = "";
  mErrRefnombre: string = "";
  mErrTareas: string = "";

  constructor(
    private modalActive: NgbActiveModal,
    private form: FormBuilder,
    private service: ExperienceService,
    private comunicationService: WalkietalkieService
  ) {
    this.formExperience = this.form.group({
      id: [0,[Validators.minLength(1), Validators.maxLength(10)]],
      cargo: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      empresa: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      desde: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      hasta: ['',[Validators.minLength(8), Validators.maxLength(8)]],
      reftel:['',[Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      refnombre:['',[Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      tareas:['',[Validators.required, Validators.minLength(5), Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {}

  //getters
  public get Id(){
    return this.formExperience.get('id');
  }
  public get Cargo(){
    return this.formExperience.get('cargo');
  }
  public get Empresa(){
    return this.formExperience.get('empresa');
  }
  public get Desde(){
    return this.formExperience.get('desde');
  }
  public get Hasta(){
    return this.formExperience.get('hasta');
  }
  public get Reftel(){
    return this.formExperience.get('reftel');
  }
  public get Refnombre(){
    return this.formExperience.get('refnombre');
  }
  public get Tareas(){
    return this.formExperience.get('tareas');
  }
  //temita de errores de los validators
  //propiedades
  public get CargoValid(){ 
    return this.Cargo?.touched && !this.Cargo?.valid;
  }
  public get CargoError(){
    if (this.Cargo?.errors && this.Cargo?.touched){
      if (this.Cargo?.hasError('required')){
        this.mErrCargo = "El campo cargo es requerido.";
        return true;
      }
      if (this.Cargo?.errors?.['minlength'] || this.Cargo?.errors?.['maxlength']){
        this.mErrCargo = "El Cargo debe contener de 3 a 50 carateres de longitud.";
        return true;
      }
    }
    return false;
  }

  public get EmpresaValid(){
    return this.Empresa?.touched && !this.Empresa?.valid;
  }
  public get EmpresaError(){
    if (this.Empresa?.errors && this.Empresa?.touched){
      if (this.Empresa?.hasError('required')){
        this.mErrEmpresa = "El campo Empresa es requerido.";
        return true;
      }
      if (this.Empresa?.errors?.['minlength'] || this.Empresa?.errors?.['maxlength']){
        this.mErrEmpresa = "La Empresa debe contener de 3 a 50 carateres de longitud.";
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
      if (this.Desde?.hasError('required')){
        this.mErrDesde = "El campo Desde es requerido.";
        return true;
      }
      if (this.Desde?.errors?.['minlength'] || this.Desde?.errors?.['maxlength']){
        this.mErrDesde = "El campo Desde debe contener 8 carateres de longitud.";
        return true;
      }
    }
    return false;
  }

  public get HastaValid(){
    return this.Hasta?.touched && !this.Hasta?.valid;
  }
  public get HastaError(){
    console.log(this.Hasta?.value);//muestra el dato cuando esta completa la entrada dia mes año
    if (this.Hasta?.value){
      if (this.Hasta?.errors?.['minlength'] || this.Hasta?.errors?.['maxlength']){
        this.mErrDesde = "El campo Hasta debe contener 8 carateres de longitud.";
        return true;
      }
    }
    return false;
  }

  public get ReftelValid(){
    return this.Reftel?.touched && !this.Reftel?.valid;
  }
  public get ReftelError(){
    if (this.Reftel?.errors && this.Reftel?.touched){
      if (this.Reftel?.hasError('required')){
        this.mErrReftel = "El campo Contacto de Referencia es requerido.";
        return true;
      }
      if (this.Reftel?.errors?.['minlength'] || this.Reftel?.errors?.['maxlength']){
        this.mErrReftel = "El campo Contacto de Referencia debe contener entre 5 a 50 carateres.";
        return true;
      }
    }
    return false;
  }

  public get RefnombreValid(){
    return this.Refnombre?.touched && !this.Refnombre?.valid;
  }
  public get RefnombreError(){
    if (this.Refnombre?.errors && this.Refnombre?.touched){
      if (this.Refnombre?.hasError('required')){
        this.mErrRefnombre = "El campo Nombre de Contacto de Referencia es requerido.";
        return true;
      }
      if (this.Refnombre?.errors?.['minlength'] || this.Refnombre?.errors?.['maxlength']){
        this.mErrRefnombre = "El campo Nombre Contacto de Referencia debe contener entre 5 a 50 carateres.";
        return true;
      }
    }
    return false;
  }
  
  public get TareasValid(){
    return this.Tareas?.touched && !this.Tareas?.valid;
  }
  public get TareasError(){
    if (this.Tareas?.errors && this.Tareas?.touched){
      if (this.Tareas?.hasError('required')){
        this.mErrTareas = "El campo Tareas es requerido.";
        return true;
      }
      if (this.Tareas?.errors?.['minlength'] || this.Tareas?.errors?.['maxlength']){
        this.mErrTareas = "El campo Tareas debe contener entre 5 a 500 carateres.";
        return true;
      }
    }
    return false;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    console.log("form: ");
    console.log(this.formExperience.getRawValue());
    if (this.formExperience.valid){
      console.log("form(2): ");
      console.log(this.formExperience.getRawValue());
    }
    else {
      this.formExperience.markAllAsTouched();
      console.log(this.formExperience.value);
      console.log("el formulario es invalido");
    }
  }
  
  closeModal() {
    this.modalActive.close('Modal Closed');
  }

  dismissModal() {
    this.modalActive.dismiss('Cross click');
  }
}
