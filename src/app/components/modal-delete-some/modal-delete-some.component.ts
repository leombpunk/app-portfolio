import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BiographyService } from '../../services/biography.service';
import { ExperienceService } from '../../services/experience.service';
import { WalkietalkieService } from '../../services/walkietalkie.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-delete-some',
  templateUrl: './modal-delete-some.component.html',
  styleUrls: ['./modal-delete-some.component.css']
})
export class ModalDeleteSomeComponent implements OnInit {
  @Input() descpCard: string = '';

  @Input() idUser: string = ''; //el usuario del cual quiero borrar algo
  @Input() idItem: string = ''; //el item especifico que quiero borrar, ej.: el id del registro que quiero borrar (en la tabla 'perfil' seria 'id')
  @Input() idModule: string = ''; //el modulo de donde quiero borrar (de que tabla en la base de datos) ej.: perfil, habilidades, educacion, experiencia, etc
  @Input() idTarget: string = ''; //quiero borrar solo la imagen o la entrada completa (1 para borrar los datos, 2 para borrar solo la imagen)

  @Output() onDeleteSome: EventEmitter<string> = new EventEmitter(); //mandar el numero o el nombre para saber que seccion recargar

  constructor(
    private modalActive: NgbActiveModal,
    private bioService: BiographyService,
    private expeService: ExperienceService,
    private comunicationService: WalkietalkieService
  ) {}

  ngOnInit(): void {}

  deleteSome() {
    let response: any;
    console.log("idModule: "+this.idModule);
    switch (this.idModule) {
      case 'biography':
        if (this.idTarget === '1') {
          //llamar al servicio para borrar el contenido especificado
          //en biografia no se borran los datos solo se actualizan
          console.log('en biografia no se borran los datos solo se actualizan');
        }
        if (this.idTarget === '2') {
          //llamar al servicio para borrar el contenido especificado
          this.bioService.deleteBioImage(this.idItem).subscribe({
            next: (result: any) => {
              response = result;
              console.log('response: ');
              console.log(response);
            },
            error: (e: any) => {
              console.log('errorcito');
              console.log(e);
              console.log(e.ok);
            },
            complete: () => {
              this.comunicationService.actualizarBio(true);
              this.closeModal();
            }
          });
        }
        break;
      case 'academic':
        break;
      case 'skill':
        break;
      case 'experience':
      console.log("idTarget: "+this.idTarget);
        if (this.idTarget === '1'){
          //borrar datos
          this.expeService.deleteExperience(this.idItem).subscribe({
            next: (result: any) => {
              response = result;
              console.log('response (experiencia): ');
              console.log(response);
            },
            error: (e: any) => {
              console.log('errorcito (experiencia)');
              console.log(e);
              console.log(e.ok);
            },
            complete: () => {
              this.comunicationService.actualizarExpe(true);
              this.closeModal();
            }
          })
        }
        if (this.idTarget === '2'){
          //borrar imagen
          this.expeService.deleteExpeImage(this.idItem).subscribe({
            next: (result: any) => {
              response = result;
              console.log('response (experiencia imagen): ');
              console.log(response);
            },
            error: (e: any) => {
              console.log('errorcito (experiencia)');
              console.log(e);
              console.log(e.ok);
            },
            complete: () => {
              this.comunicationService.actualizarExpe(true);
              this.closeModal();
            }
          });
        }
        break;
      case 'project':
        break;
      default:
        console.log('forro');
        break;
    }
  }

  closeModal() {
    this.modalActive.close('Modal Closed');
  }

  dismissModal() {
    this.modalActive.dismiss('Cross click');
  }
}
