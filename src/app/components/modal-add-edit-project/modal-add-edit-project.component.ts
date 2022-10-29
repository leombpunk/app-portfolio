import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Project } from 'src/app/model/projects';
import { ProjectService } from 'src/app/services/project.service';
import { WalkietalkieService } from 'src/app/services/walkietalkie.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-add-edit-project',
  templateUrl: './modal-add-edit-project.component.html',
  styleUrls: ['./modal-add-edit-project.component.css']
})
export class ModalAddEditProjectComponent implements OnInit {

  @Input() titleModal: string = "";
  @Input() usuario_id: number = 0;

  formProject: FormGroup;

  mErrNombre: string = "";
  mErrDescripcion: string = "";
  mErrDesde: string = "";
  mErrHasta: string = "";
  mErrSitio: string = "";
  mErrEnlace: string = "";

  mensaje: string = "";
  spinner: boolean = false;

  @Input() project: Project = new Project();
  
  constructor(
    private modalActive: NgbActiveModal, 
    private form: FormBuilder, 
    private service: ProjectService, 
    private comunicationService: WalkietalkieService,
    private toastr: ToastrService) { 
    this.formProject = this.form.group({
      id: [0,[Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      usuarios_id: [0,[Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      nombre: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      descripcion: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
      desde: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      hasta: ['',[Validators.maxLength(10)]],
      sitio: ['',[Validators.maxLength(100)]],
      enlace: ['',[Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void { }

  //getters
  public get Nombre(){
    return this.formProject.get('nombre');
  }
  public get Descripcion(){
    return this.formProject.get('descripcion');
  }
  public get Desde(){
    return this.formProject.get('desde');
  }
  public get Hasta(){
    return this.formProject.get('hasta');
  }
  public get Sitio(){
    return this.formProject.get('sitio');
  }
  public get Enlace(){
    return this.formProject.get('enlace');
  }

  //metodos
  public get NombreValid(){
    return this.Nombre!.touched && !this.Nombre!.valid;
  }
  public get NombreError(){
    if (this.Nombre!.errors && this.Nombre!.touched) {
      // console.log("primer if");
      if(this.Nombre!.hasError('required')){
        // console.log("segundo if");
        this.mErrNombre = "El Nombre es requerido";
        return true;
      }
      if(this.Nombre!.errors!['minlength'] || this.Nombre!.errors!['maxlength']){
        this.mErrNombre = "El Nombre debe contener de 5 a 50 carateres";
        return true;
      }
    }
    return false;
  }

  public get DescripcionValid(){
    return this.Descripcion!.touched && !this.Descripcion!.valid;
  }
  public get DescripcionError(){
    if (this.Descripcion!.errors && this.Descripcion!.touched){
      if (this.Descripcion!.hasError('required')){
        this.mErrDescripcion = "La descripcion es requerida";
        return true;
      }
      if(this.Descripcion!.errors!['minlength'] || this.Descripcion!.errors!['maxlength']){
        this.mErrDescripcion = "La descripcion debe contener de 5 a 500 carateres";
        return true;
      }
    }
    return false;
  }

  public get EnlaceValid(){
    return this.Enlace!.touched && !this.Enlace!.valid;
  }
  public get EnlaceError(){
    if (this.Enlace!.errors && this.Enlace!.touched){
      if(this.Enlace!.errors!['maxlength']){
        this.mErrEnlace = "El enlace/repositorio debe contener un maximo de 100 carateres";
        return true;
      }
    }
    return false;
  }

  public get SitioValid(){
    return this.Sitio!.touched && !this.Sitio!.valid;
  }
  public get SitioError(){
    if (this.Sitio!.errors && this.Sitio!.touched){
      if(this.Sitio!.errors!['maxlength']){
        this.mErrSitio = "El sitio/demo debe contener un maximo de 100 carateres";
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
        this.mErrDesde = "El campo inicio es requerido";
        return true;
      }
      if(this.Desde!.errors!['minlength'] || this.Desde!.errors!['maxlength']){
        this.mErrDesde = "El campo inicio debe contener un minimo y maximo de 10 carateres";
        return true;
      }
    }
    return false;
  }

  public get HastaValid(){
    return this.Hasta!.touched && !this.Hasta!.valid;
  }
  public get HastaError(){
    if (this.Hasta!.errors && this.Hasta!.touched){
      if(this.Hasta!.errors!['maxlength']){
        this.mErrHasta = "El campo fin debe contener un maximo de 10 carateres";
        return true;
      }
    }
    return false;
  }

  onSubmit(event: Event){
    event.preventDefault();
    if (this.formProject.valid){
      this.spinner = true;
      // console.log(this.formProject.value);
      // console.log("el formulario es valido");
      if (this.project.nombre !== ''){
        //editar proyecto
        let id: any = this.formProject.get('id');
        this.service.putProject(id.value, this.formProject.value).subscribe({
          next: (result: any) => {
            // console.log("result");
            // console.log(result);
            this.mensaje = "";
            this.toastr.success(
              'Proyecto actualizado correctamente.',
              'Bien!',
              {
                timeOut: 3000,
                positionClass: 'toast-bottom-right'
              }
            );
          }, 
          error: (e: any) => {
            // console.log("error");
            // console.log(e);
            this.toastr.error(
              'Error al intentar actualizar su Formación Academica.',
              'Error!',
              {
                timeOut: 3000,
                positionClass: 'toast-bottom-right'
              }
            );
            this.spinner = false;
            this.mensaje = "Error al actualizar. " +e;
          }, 
          complete: () => {
            this.comunicationService.actualizarProj(true);
            this.closeModal();
          }
        });
      }
      else {
        //crear proyecto
        this.formProject.patchValue({
          usuarios_id: this.usuario_id
        });
        this.service.postProject(this.formProject.value).subscribe({
          next: (result: any) => {
            // console.log("result");
            // console.log(result);
            this.mensaje = "";
            this.toastr.success(
              'Proyecto agregado correctamente.',
              'Bien!',
              {
                timeOut: 3000,
                positionClass: 'toast-bottom-right'
              }
            );
          }, 
          error: (e: any) => {
            // console.log("error");
            // console.log(e);
            this.toastr.error(
              'Error al intentar agregar un proyecto.',
              'Error!',
              {
                timeOut: 3000,
                positionClass: 'toast-bottom-right'
              }
            );
            this.spinner = false;
            this.mensaje = "Error al intentar agregar.";
          }, 
          complete: () => {
            this.comunicationService.actualizarProj(true);
            this.closeModal();
          }
        });
      }
    }
    else {
      this.formProject.markAllAsTouched();
      // console.log("el formulario es invalido");
      // console.log(this.formProject.value);
      // console.log(this.formProject.errors);
      this.toastr.error(
        'Revise los campos resaltados.',
        'Error!',
        {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        }
      );
      this.spinner = false;
      this.mensaje = "Revise los campos.";
    }
  }

  closeModal() {
    this.modalActive.close('Modal Closed');
  }

  dismissModal(){
    this.modalActive.dismiss('Cross click');
  }
}
