import { Component, OnInit, Input } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { ModalAddEditAcademicComponent } from '../modal-add-edit-academic/modal-add-edit-academic.component';
import { ModalAddEditExperienceComponent } from '../modal-add-edit-experience/modal-add-edit-experience.component';
import { ModalAddEditProjectComponent } from '../modal-add-edit-project/modal-add-edit-project.component';
import { ModalAddEditSkillComponent } from '../modal-add-edit-skill/modal-add-edit-skill.component';

@Component({
  selector: 'app-button-add',
  templateUrl: './button-add.component.html',
  styleUrls: ['./button-add.component.css']
})
export class ButtonAddComponent implements OnInit {
  faPlus = faPlus;

  @Input() modalTarget: string = '';

  constructor(private modalService: NgbModal) { }

  openModal() {
    // console.log("modalTarget:"+this.modalTarget);
    switch (this.modalTarget) {
      case 'skill':
        let wea2 = this.modalService.open(ModalAddEditSkillComponent, {
          backdrop: 'static',
          centered: true
        });
        // .result.then(result => {}, reason => {});
        wea2.componentInstance.titleModal = 'Agregar Habilidad';
        break;
      case 'project':
        let wea3 = this.modalService.open(ModalAddEditProjectComponent, {
          backdrop: 'static',
          centered: true
        });
        // .result.then(result => {}, reason => {});
        wea3.componentInstance.titleModal = 'Agregar Proyecto';
        break;
      case 'academic':
        let wea4 = this.modalService.open(ModalAddEditAcademicComponent, {
          backdrop: 'static',
          centered: true
        });
        // .result.then(result => {}, reason => {});
        wea4.componentInstance.titleModal = 'Agregar Educación';
        break;
      case 'experience':
        let wea5 = this.modalService.open(ModalAddEditExperienceComponent, {
          backdrop: 'static',
          centered: true
        });
        // .result.then(result => {}, reason => {});
        wea5.componentInstance.titleModal = 'Agregar Experiencia Laboral';
        break;
      default:
        console.log('que forro que sos');
        break;
    }
  }

  ngOnInit(): void {
  }

}
