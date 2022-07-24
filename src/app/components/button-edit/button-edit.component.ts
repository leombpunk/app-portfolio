import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { ModalAddEditBiographyComponent } from '../modal-add-edit-biography/modal-add-edit-biography.component';
import { ModalAddEditAcademicComponent } from '../modal-add-edit-academic/modal-add-edit-academic.component';
import { ModalAddEditExperienceComponent } from '../modal-add-edit-experience/modal-add-edit-experience.component';
import { ModalAddEditProjectComponent } from '../modal-add-edit-project/modal-add-edit-project.component';
import { ModalAddEditSkillComponent } from '../modal-add-edit-skill/modal-add-edit-skill.component';
import { ModalEditImageComponent } from '../modal-edit-image/modal-edit-image.component';

import { Biography, Biography1 } from '../../mocks/biography';
import { BiographyService } from 'src/app/services/biography.service';

@Component({
  selector: 'app-button-edit',
  templateUrl: './button-edit.component.html',
  styleUrls: ['./button-edit.component.css']
})
export class ButtonEditComponent implements OnInit {
  faPenToSquare = faPenToSquare;

  @Input() modalTarget: string = '';
  @Input() type: string = '';
  @Input() perfil_id: number = 0;

  //codigo a testear
  //esta variable recibira un objeto de tipo Biography1 para
  //cargar los datos que contiene en el modal de editar perfil o biografia
  @Input() perfilData: Biography1 = new Biography1();

  constructor(
    private modalService: NgbModal,
    private serviceBio: BiographyService
  ) {}

  ngOnInit(): void {}

  // openModal deberia recibir un parametro o mas (id por ejemplo)
  // para pasarselo al servicio y poder hacer el get de la info solicitada
  // el id del registro y/o tambien junto con el id del usuario
  openModal() {
    //evaluar el parametro si es 1 o 2 por ejemplo
    //si es 1 cargar los modales de editar imagenes
    //si es 2 cargar los modales de editar los datos
    const modal = {
      bio:
        this.type === '1'
          ? ModalAddEditBiographyComponent
          : ModalEditImageComponent,
      experience:
        this.type === '1'
          ? ModalAddEditExperienceComponent
          : ModalEditImageComponent,
      academic:
        this.type === '1'
          ? ModalAddEditAcademicComponent
          : ModalEditImageComponent,
      project:
        this.type === '1'
          ? ModalAddEditProjectComponent
          : ModalEditImageComponent,
      skill:
        this.type === '1' ? ModalAddEditSkillComponent : ModalEditImageComponent
    };
    console.log('perfil_id(button): ' + this.perfil_id);
    console.log('modalTarget:' + this.modalTarget);
    switch (this.modalTarget) {
      case 'biography':
        let wea = this.modalService.open(modal.bio, {
          backdrop: 'static',
          centered: true
        });
        //.result.then(result => {}, reason => {});
        wea.componentInstance.titleModal = 'Editar Perfil';

        //testeo de seteo en formulario
        wea.componentInstance.formBiography.setValue({
          id: this.perfilData.id,
          titulo: this.perfilData.titulo,
          nombre: this.perfilData.nombre,
          apellido: this.perfilData.apellido,
          acercade: this.perfilData.acercade,
          correo: this.perfilData.correo,
          linkedin: this.perfilData.linkedin,
          github: this.perfilData.github,
        });
        // modal.bio.formBiography.setValue({titulo: this.perfilData.titulo});
        wea.componentInstance.bio = this.perfilData;
        break;
      case 'skill':
        let wea2 = this.modalService.open(modal.skill, {
          backdrop: 'static',
          centered: true
        });
        // .result.then(result => {}, reason => {});
        wea2.componentInstance.titleModal = 'Editar Habilidad';
        break;
      case 'project':
        let wea3 = this.modalService.open(modal.project, {
          backdrop: 'static',
          centered: true
        });
        // .result.then(result => {}, reason => {});
        wea3.componentInstance.titleModal = 'Editar Proyecto';
        break;
      case 'academic':
        let wea4 = this.modalService.open(modal.academic, {
          backdrop: 'static',
          centered: true
        });
        // .result.then(result => {}, reason => {});
        wea4.componentInstance.titleModal = 'Editar Educación';
        break;
      case 'experience':
        let wea5 = this.modalService.open(modal.experience, {
          backdrop: 'static',
          centered: true
        });
        // .result.then(result => {}, reason => {});
        wea5.componentInstance.titleModal = 'Editar Experiencia Laboral';
        break;
      default:
        console.log('que forro que sos');
        break;
    }
  }
}
