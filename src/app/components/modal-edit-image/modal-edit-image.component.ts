import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BiographyService } from '../../services/biography.service';
import { WalkietalkieService } from '../../services/walkietalkie.service';

@Component({
  selector: 'app-modal-edit-image',
  templateUrl: './modal-edit-image.component.html',
  styleUrls: ['./modal-edit-image.component.css']
}) 
export class ModalEditImageComponent implements OnInit {

  @Input() formBiographyImg: FormGroup;
  @Input() titleModal: string = "";
  mErrImage: string = "";
  imgBandera: boolean = false;
  @Input() id: number = 0;
  @Input() usuario_id: string = "";
  filecito:any;

  constructor(
    private modalActive: NgbActiveModal, 
    private form: FormBuilder, 
    private serviceBio: BiographyService, 
    private comunicationService: WalkietalkieService) {
      this.formBiographyImg = this.form.group({
        id:[this.id,[Validators.required]],
        img:['',[Validators.required]],
      });
  }

  ngOnInit(): void {
  }

  public get Image(){
    return this.formBiographyImg.get("img");
  }
  public get ImageValid(){
    return this.Image?.touched && !this.Image?.valid;
  }
  public get ImageError(){
    // let id = this.formBiographyImg.get("id");
    // let img = this.Image ? this.Image.value : '';
    // console.log(this.Image);
    // if (this.Image?.value === '' && this.Image?.touched){
    //   this.mErrImage = "La imagen es requerida (. )( .)";
    //   return true;
    // }
    if (this.imgBandera){
      return true;
    }
    if (this.Image?.touched) {
      if(this.Image?.hasError('required')){
        this.mErrImage = "La imagen es requerida";
        return true;
      }
    }
    
    return false;
  }

  onFileSelected(event:any){
    const imgFile: File = event.target.files[0];
    // console.log(imgFile);
    this.imgBandera = false;
    // console.log(imgFile.type);
    if (imgFile){
      if (imgFile.type !== "image/jpeg" && imgFile.type !== "image/png"){
        this.mErrImage = "El formato de imagen no es correcto";
        this.imgBandera = true;
        this.Image?.setErrors({status: "INVALID"});
      }
      if (imgFile.size >= 5000000){ // casi 5mb, esta expresado en bytes
        this.mErrImage = "El tamaño de la imagen es muy grande";
        this.imgBandera = true;
        this.Image?.setErrors({status: "INVALID"});
      }
      //si es el formato que espero recibir guardo el archivo en la variable
      if (imgFile.type === "image/jpeg" || imgFile.type === "image/png"){
        this.filecito = event.target.files[0];
        this.imgBandera = false;
      }
    }
    else {
      this.imgBandera = false;
    }
    console.log(this.filecito);
  }

  onSubmit(event: Event){
    event.preventDefault();
    if(this.formBiographyImg.valid){
      //darle los datos al servicio
      //console.log(this.formBiographyImg.getRawValue());
      // console.log(this.formBiographyImg.value);
      console.log("el fomrulario es valido");
      // const file: File = this.Image?.target.files[0]
      let response: any;
      let id: any = this.formBiographyImg.get('id');
      const formData: FormData = new FormData();
      formData.append('img', this.filecito);
      // console.log(this.filecito);
      this.serviceBio.setBioImage(id.value, formData).subscribe({
        next: (result) => {
          response = result;
          console.log("response: ");
          console.log(response);
          if (result.status === "ok"){
            //emitir un evento? que ejecute de nuevo el get de perfil
            //para actualizar los datos

            //cierro el modal
            this.closeModal();
          }
        },
        error: (e) => {
          console.log("errorcito");
          console.log(e);
        },
        complete: () => {
          this.comunicationService.actualizarBio(true);
          this.closeModal();
        }
      });
    }
    else {
      this.formBiographyImg.markAllAsTouched();
      // console.log(this.formBiographyImg.value);
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
