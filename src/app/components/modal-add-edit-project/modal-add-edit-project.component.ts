import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-add-edit-project',
  templateUrl: './modal-add-edit-project.component.html',
  styleUrls: ['./modal-add-edit-project.component.css']
})
export class ModalAddEditProjectComponent implements OnInit {

  @Input() titleModal: string = "";
  
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
