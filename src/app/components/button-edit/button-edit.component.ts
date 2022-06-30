import { Component, OnInit, Input } from '@angular/core';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    switch (this.modalTarget) {
      case "biography":
        this.modalService
          .open(ModalAddEditBiographyComponent)
          .result.then(result => {}, reason => {});
        break;
      case "skill":
        this.modalService
          .open(ModalAddEditSkillComponent)
          .result.then(result => {}, reason => {});
        break;
      case "project":
        this.modalService
          .open(ModalAddEditProjectComponent)
          .result.then(result => {}, reason => {});
        break;
      case "academic":
        this.modalService
          .open(ModalAddEditAcademicComponent)
          .result.then(result => {}, reason => {});
        break;
      case "experience":
        this.modalService
          .open(ModalAddEditExperienceComponent)
          .result.then(result => {}, reason => {});
        break;
      default:
        console.log("que forro que sos");
        break;
    }
  }

  ngOnInit(): void {
  }
}
