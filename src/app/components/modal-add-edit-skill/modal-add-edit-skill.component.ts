import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Skill } from 'src/app/model/skills';
import { SkillService } from 'src/app/services/skill.service';
import { WalkietalkieService } from 'src/app/services/walkietalkie.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-add-edit-skill',
  templateUrl: './modal-add-edit-skill.component.html',
  styleUrls: ['./modal-add-edit-skill.component.css']
})
export class ModalAddEditSkillComponent implements OnInit {
  
  @Input() titleModal: string = "";
  @Input() usuario_id: number = 0;
  @Input() skill: Skill = new Skill();
  formSkill: FormGroup;

  mErrDescripcion: string = "";
  mErrTipoHabilidad: string = "";
  mErrNivel: string = "";

  mensaje: string = "";
  spinner: boolean = false;

  constructor(
    private modalActive: NgbActiveModal,
    private form: FormBuilder,
    private service: SkillService,
    private comunicationService: WalkietalkieService,
    private toastr: ToastrService
    ) {
      this.formSkill = this.form.group({
        id: [0,[Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
        usuarios_id: [0,[Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
        descripcion: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        nivel: [0,[Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
        tipo_habilidad_id: [0,[Validators.required, Validators.minLength(1), Validators.maxLength(10)]]
      });
    }
    
  ngOnInit(): void { }

  //getters
  public get Descripcion(){
    return this.formSkill.get('descripcion');
  }
  public get Nivel(){
    return this.formSkill.get('nivel');
  }
  public get TipoHabilidadId(){
    return this.formSkill.get('tipo_habilidad_id');
  }

  //metodos
  public get DescripcionValid(){
    return this.Descripcion!.touched && !this.Descripcion!.valid;
  }
  public get DescripcionError(){
    if (this.Descripcion!.errors && this.Descripcion!.touched){
      if (this.Descripcion!.hasError('required')){
        this.mErrDescripcion = "La descripcion es requerida";
        return true;
      }
      if (this.Descripcion!.errors!['minlength'] || this.Descripcion!.errors!['maxlength']){
        this.mErrDescripcion = "La descripcion debe contener entre 2 a 50 caracteres";
        return true;
      }
    }
    return false;
  }
  public get NivelValid(){
    return this.Nivel!.touched && !this.Nivel!.valid;
  }
  public get NivelError(){
    if (this.Nivel!.errors && this.Nivel!.touched){
      if (this.Nivel!.hasError('required')){
        this.mErrNivel = "El nivel es requerido";
        return true;
      }
      if (this.Nivel!.errors!['minlength'] || this.Nivel!.errors!['maxlength']){
        this.mErrNivel = "El nivel debe contener entre 1 a 2 caracteres";
        return true;
      }
    }
    return false;
  }
  public get TipoHabilidadIdValid(){
    return this.TipoHabilidadId!.touched && !this.TipoHabilidadId!.valid;
  }
  public get TipoHabilidadIdError(){
    if (this.TipoHabilidadId!.errors && this.TipoHabilidadId!.touched){
      if (this.TipoHabilidadId!.hasError('required')){
        this.mErrTipoHabilidad = "El tipo de habilidad es requerido";
        return true;
      }
      if (this.TipoHabilidadId!.errors!['minlength'] || this.TipoHabilidadId!.errors!['maxlength']){
        this.mErrTipoHabilidad = "El tipo de habilidad debe ser alguno de la lista dada";
        return true;
      }
    }
    return false;
  }

  onSubmit(event: Event){
    event.preventDefault();
    if (this.formSkill.valid){
      // console.log("el formulario es valido");
      // console.log(this.formSkill.value);
      this.spinner = true;
      if (this.skill.descripcion !== ''){
        //editar habilidad
        let id: any = this.formSkill.get('id');
        this.service.putSkill(id.value, this.formSkill.value).subscribe({
          next: (result: any) => {
            // console.log("result");
            // console.log(result);
            this.mensaje = "";
            this.toastr.success(
              'Habilidad actualizada correctamente.',
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
            this.mensaje = "Error al actualizar. " + e;
            this.toastr.error(
              'Error al intentar actualizar la habilidad.',
              'Error!',
              {
                timeOut: 3000,
                positionClass: 'toast-bottom-right'
              }
            );
            this.spinner = false;
          }, 
          complete: () => {
            this.comunicationService.actualizarSkill(true);
            this.closeModal();
          }
        });
      }
      else {
        //crear habilidad
        this.formSkill.patchValue({
          usuarios_id: this.usuario_id
        });
        this.service.postSkill(this.formSkill.value).subscribe({
          next: (result: any) => {
            // console.log("result");
            // console.log(result);
            this.mensaje = "";
            this.toastr.success(
              'Habilidad agregada correctamente.',
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
            this.mensaje = "Error al intentar agregar.";
            this.toastr.error(
              'Error al intentar agregar la habilidad.',
              'Error!',
              {
                timeOut: 3000,
                positionClass: 'toast-bottom-right'
              }
            );
            this.spinner = false;
          }, 
          complete: () => {
            this.comunicationService.actualizarSkill(true);
            this.closeModal();
          }
        });
      }
    }
    else {
      this.formSkill.markAllAsTouched();
      // console.log("el formulario no es valido");
      // console.log(this.formSkill.value);
      // console.log(this.formSkill.errors);
      this.toastr.error(
        'Revise por favor los campos resaltados.',
        'Error!',
        {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        }
      );
      this.spinner = false;
      this.mensaje = "Revise los campos";
    }
  }

  closeModal() {
    this.modalActive.close('Modal Closed');
  }

  dismissModal(){
    this.modalActive.dismiss('Cross click');
  }
}
