import { Component, OnInit, Input } from '@angular/core';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { ModalAddEditBiographyComponent } from '../modal-add-edit-biography/modal-add-edit-biography.component';
import { ModalAddEditAcademicComponent } from '../modal-add-edit-academic/modal-add-edit-academic.component';
import { ModalAddEditExperienceComponent } from '../modal-add-edit-experience/modal-add-edit-experience.component';
import { ModalAddEditProjectComponent } from '../modal-add-edit-project/modal-add-edit-project.component';
import { ModalAddEditSkillComponent } from '../modal-add-edit-skill/modal-add-edit-skill.component';

@Component({
  selector: 'app-button-edit',
  templateUrl: './button-edit.component.html',
  styleUrls: ['./button-edit.component.css']
})
export class ButtonEditComponent implements OnInit {
  faPenToSquare = faPenToSquare;

  @Input() btnEditID: string = '';
  // @Input() modalId: string = '';
  //agregar un modalTarget para hacer un switch dentro de openModal()
  @Input() modalTarget: string = '';

  constructor(private modalService: NgbModal) {}

  // openModal deberia recibir un parametro o mas (id por ejemplo)
  // para pasarselo al servicio y poder hacer el get de la info solicitada
  // el id del registro y/o tambien junto con el id del usuario
  openModal() {
    console.log("modalTarget:"+this.modalTarget);
    switch (this.modalTarget) {
      case 'biography':
        let wea = this.modalService.open(ModalAddEditBiographyComponent, {
          backdrop: 'static',
          centered: true
        });
        //.result.then(result => {}, reason => {});
        wea.componentInstance.titleModal = 'Editar Perfil';
        break;
      case 'skill':
        let wea2 = this.modalService.open(ModalAddEditSkillComponent, {
          backdrop: 'static',
          centered: true
        });
        // .result.then(result => {}, reason => {});
        wea2.componentInstance.titleModal = 'Editar Habilidad';
        break;
      case 'project':
        let wea3 = this.modalService.open(ModalAddEditProjectComponent, {
          backdrop: 'static',
          centered: true
        });
        // .result.then(result => {}, reason => {});
        wea3.componentInstance.titleModal = 'Editar Proyecto';
        break;
      case 'academic':
        let wea4 = this.modalService.open(ModalAddEditAcademicComponent, {
          backdrop: 'static',
          centered: true
        });
        // .result.then(result => {}, reason => {});
        wea4.componentInstance.titleModal = 'Editar Educación';
        break;
      case 'experience':
        let wea5 = this.modalService.open(ModalAddEditExperienceComponent, {
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

  ngOnInit(): void {}
}
