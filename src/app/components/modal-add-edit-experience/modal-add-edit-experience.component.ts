import { Component, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-add-edit-experience',
  templateUrl: './modal-add-edit-experience.component.html',
  styleUrls: ['./modal-add-edit-experience.component.css']
})
export class ModalAddEditExperienceComponent implements OnInit {

  constructor(private modalActive: NgbActiveModal) { }

  closeModal() {
    this.modalActive.close('Modal Closed');
  }

  dismissModal(){
    this.modalActive.dismiss('Cross click');
  }

  ngOnInit(): void {
  }

}
