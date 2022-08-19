import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ExperienceService } from '../../services/experience.service';
import { WalkietalkieService } from '../../services/walkietalkie.service';
import { Experience } from '../../mocks/experience';

@Component({
  selector: 'app-modal-add-edit-experience',
  templateUrl: './modal-add-edit-experience.component.html',
  styleUrls: ['./modal-add-edit-experience.component.css']
})
export class ModalAddEditExperienceComponent implements OnInit {
  @Input() titleModal: string = '';
  @Input() formExperience: FormGroup;
  @Input() expe: Experience = new Experience();

  constructor(
    private modalActive: NgbActiveModal,
    private form: FormBuilder,
    private service: ExperienceService,
    private comunicationService: WalkietalkieService
  ) {
    this.formExperience = this.form.group({
      id: [0,[Validators.minLength(1), Validators.maxLength(10)]],
      cargo: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      empresa: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      desde: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      hasta: ['',[Validators.minLength(8), Validators.maxLength(8)]],
      reftel:['',[Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      refnombre:['',[Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      tareas:['',[Validators.required, Validators.minLength(5), Validators.maxLength(500)]]
    });
  }

  closeModal() {
    this.modalActive.close('Modal Closed');
  }

  dismissModal() {
    this.modalActive.dismiss('Cross click');
  }

  ngOnInit(): void {}

  onSubmit(event: Event) {
    event.preventDefault();
    console.log("from: ");
    console.log(this.formExperience.getRawValue());
  }
}
