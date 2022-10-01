import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ExperienceService } from '../../services/experience.service';
import { WalkietalkieService } from '../../services/walkietalkie.service';
import { Experience } from '../../model/experience';

@Component({
  selector: 'app-modal-add-edit-experience',
  templateUrl: './modal-add-edit-experience.component.html',
  styleUrls: ['./modal-add-edit-experience.component.css']
})
export class ModalAddEditExperienceComponent implements OnInit {

  @Input() titleModal: string = '';
  @Input() formExperience: FormGroup;
  @Input() expe: Experience = new Experience();
  @Input() usuario_id: number = 0;

  mErrCargo: string = "";
  mErrEmpresa: string = "";
  mErrDesde: string = "";
  mErrHasta: string = "";
  mErrReftelef: string = "";
  mErrRefnombre: string = "";
  mErrTarea: string = "";

  mensaje: string = "";

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
      desde: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      hasta: ['',[Validators.minLength(10), Validators.maxLength(10)]],
      reftelef: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      refnombre: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      tarea: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
      usuarios_id: [0,[Validators.minLength(1), Validators.maxLength(10)]]
    });
  }

  ngOnInit(): void {
    // console.log("init -> expe: ");
    // console.log(this.expe);
  }

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
  public get Reftelef(){
    return this.formExperience.get('reftelef');
  }
  public get Refnombre(){
    return this.formExperience.get('refnombre');
  }
  public get Tarea(){
    return this.formExperience.get('tarea');
  }
  //temita de errores de los validators
  //propiedades
  public get CargoValid(){ 
    return this.Cargo!.touched && !this.Cargo!.valid;
  }
  public get CargoError(){
    if (this.Cargo!.errors && this.Cargo!.touched){
      if (this.Cargo!.hasError('required')){
        this.mErrCargo = "El campo cargo es requerido.";
        return true;
      }
      if (this.Cargo!.errors!['minlength'] || this.Cargo!.errors!['maxlength']){
        this.mErrCargo = "El Cargo debe contener de 3 a 50 carateres de longitud.";
        return true;
      }
    }
    return false;
  }

  public get EmpresaValid(){
    return this.Empresa!.touched && !this.Empresa!.valid;
  }
  public get EmpresaError(){
    if (this.Empresa!.errors && this.Empresa!.touched){
      if (this.Empresa!.hasError('required')){
        this.mErrEmpresa = "El campo Empresa es requerido.";
        return true;
      }
      if (this.Empresa!.errors!['minlength'] || this.Empresa!.errors!['maxlength']){
        this.mErrEmpresa = "La Empresa debe contener de 3 a 50 carateres de longitud.";
        return true;
      }
    }
    return false;
  }

  public get DesdeValid(){
    return this.Desde!.touched && !this.Desde!.valid;
  }
  public get DesdeError(){
    if (this.Desde!.errors && this.Desde!.touched){
      if (this.Desde!.hasError('required')){
        this.mErrDesde = "El campo Desde es requerido.";
        return true;
      }
      if (this.Desde!.errors!['minlength'] || this.Desde!.errors!['maxlength']){
        this.mErrDesde = "El campo Desde debe contener 8 carateres de longitud.";
        return true;
      }
    }
    return false;
  }

  public get HastaValid(){
    return this.Hasta!.touched && !this.Hasta!.valid;
  }
  public get HastaError(){
    //console.log(this.Hasta!.value);//muestra el dato cuando esta completa la entrada dia mes año
    if (this.Hasta!.errors && this.Hasta!.touched){
      if (this.Hasta!.errors!['minlength'] || this.Hasta!.errors!['maxlength']){
        this.mErrHasta = "El campo Hasta debe contener 8 carateres de longitud.";
        return true;
      }
    }
    return false;
  }

  public get ReftelefValid(){
    return this.Reftelef!.touched && !this.Reftelef!.valid;
  }
  public get ReftelefError(){
    if (this.Reftelef!.errors && this.Reftelef!.touched){
      if (this.Reftelef!.hasError('required')){
        this.mErrReftelef = "El campo Contacto de Referencia es requerido.";
        return true;
      }
      if (this.Reftelef!.errors!['minlength'] || this.Reftelef!.errors!['maxlength']){
        this.mErrReftelef = "El campo Contacto de Referencia debe contener entre 5 a 50 carateres.";
        return true;
      }
    }
    return false;
  }

  public get RefnombreValid(){
    return this.Refnombre!.touched && !this.Refnombre!.valid;
  }
  public get RefnombreError(){
    if (this.Refnombre!.errors && this.Refnombre!.touched){
      if (this.Refnombre!.hasError('required')){
        this.mErrRefnombre = "El campo Nombre de Contacto de Referencia es requerido.";
        return true;
      }
      if (this.Refnombre!.errors!['minlength'] || this.Refnombre!.errors!['maxlength']){
        this.mErrRefnombre = "El campo Nombre Contacto de Referencia debe contener entre 5 a 50 carateres.";
        return true;
      }
    }
    return false;
  }
  
  public get TareaValid(){
    return this.Tarea!.touched && !this.Tarea!.valid;
  }
  public get TareaError(){
    if (this.Tarea!.errors && this.Tarea!.touched){
      if (this.Tarea!.hasError('required')){
        this.mErrTarea = "El campo tarea es requerido.";
        return true;
      }
      if (this.Tarea!.errors!['minlength'] || this.Tarea!.errors!['maxlength']){
        this.mErrTarea = "El campo tarea debe contener entre 5 a 500 carateres.";
        return true;
      }
    }
    return false;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    // console.log("form: ");
    if (this.formExperience.valid){
      // pregunto si la varialbe 'expe' tiene datos
      //si los tiene, hice la llamada por el boton de editar
      if (this.expe.cargo !== ''){
        let id: any = this.formExperience.get('id');
        this.service.putExperience(id.value, this.formExperience.value).subscribe({
          next: (result: any) => {
            // console.log("result: ");
            // console.log(result);
            this.mensaje = "";
          }, 
          error: (e: any) => {
            // console.log("errorcito");
            // console.log(e);
            // console.log(e.ok);
            this.mensaje = "Error al actualizar. " + e;
          },
          complete: () => {
            this.comunicationService.actualizarExpe(true);
            this.closeModal();
          }
        });
      }
      //si en cambio esta vacio, hice la llamada por el boton añadir 
      else{
        this.formExperience.patchValue({
          usuarios_id: this.usuario_id,
        });
        // console.log(this.formExperience.value);
        // console.log(this.formExperience.getRawValue());
        this.service.postExperience(this.formExperience.value).subscribe({
          next: (result: any) => {
            // console.log("result: ");
            // console.log(result);
            this.mensaje = "";
          },
          error: (e: any) => {
            // console.log("errorcito");
            // console.log(e);
            this.mensaje = "Error al intentar agregar. " + e;
          },
          complete: () => {
            this.comunicationService.actualizarExpe(true);
            this.closeModal();
          }
        });
      }
    }
    else {
      this.formExperience.markAllAsTouched();
      // console.log(this.formExperience.value);
      // console.log("el formulario es invalido");
      this.mensaje = "Revise los campos.";
    }
  }
  
  closeModal() {
    this.modalActive.close('Modal Closed');
  }

  dismissModal() {
    this.modalActive.dismiss('Cross click');
  }
}
