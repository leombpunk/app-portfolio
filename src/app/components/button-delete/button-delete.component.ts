import { Component, OnInit, Input } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { ModalDeleteSomeComponent } from '../modal-delete-some/modal-delete-some.component';

@Component({
  selector: 'app-button-delete',
  templateUrl: './button-delete.component.html',
  styleUrls: ['./button-delete.component.css']
})
export class ButtonDeleteComponent implements OnInit {
  faTrashAlt = faTrashAlt;

  @Input() modalTarget: string = '';
  @Input() type: string = "";

  constructor(private modalService: NgbModal) { }
  openModal() {
    //evaluar el parametro si es 1 o 2 por ejemplo
    //si es 1 cargar los modales de editar imagenes
    //si es 2 cargar los modales de editar los datos
    const modal = {
      bio: ModalDeleteSomeComponent,
      experience: ModalDeleteSomeComponent,
      academic: ModalDeleteSomeComponent, 
      project: ModalDeleteSomeComponent,
      skill: ModalDeleteSomeComponent
    }

    console.log("modalTarget:"+this.modalTarget);
    switch (this.modalTarget) {
      case 'biography':
        let wea = this.modalService.open(modal.bio, {
          backdrop: 'static',
          centered: true
        });
        //.result.then(result => {}, reason => {});
        wea.componentInstance.descpCard = this.type === '2'?'la imagen del Perfil':'el Perfil';
        break;
      case 'skill':
        let wea2 = this.modalService.open(modal.skill, {
          backdrop: 'static',
          centered: true
        });
        // .result.then(result => {}, reason => {});
        wea2.componentInstance.descpCard = this.type === '2'?'la imagen de la Habilidad':'la Habilidad';
        break;
      case 'project':
        let wea3 = this.modalService.open(modal.project, {
          backdrop: 'static',
          centered: true
        });
        // .result.then(result => {}, reason => {});
        wea3.componentInstance.descpCard = this.type === '2'?'la imagen del Proyecto':'el Proyecto';
        break;
      case 'academic':
        let wea4 = this.modalService.open(modal.academic, {
          backdrop: 'static',
          centered: true
        });
        // .result.then(result => {}, reason => {});
        wea4.componentInstance.descpCard = this.type === '2'?'la imagen del Instituto Educativo':'los datos del Instituto Educativo';
        break;
      case 'experience':
        let wea5 = this.modalService.open(modal.experience, {
          backdrop: 'static',
          centered: true
        });
        // .result.then(result => {}, reason => {});
        wea5.componentInstance.descpCard = this.type ==='2'?'la imagen de la Empresa':'los datos de la Empresa';
        break;
      default:
        console.log('que forro que sos');
        break;
    }
  }

  ngOnInit(): void {
  }

}
