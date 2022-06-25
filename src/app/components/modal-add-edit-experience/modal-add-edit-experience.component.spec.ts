import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddEditExperienceComponent } from './modal-add-edit-experience.component';

describe('ModalAddEditExperienceComponent', () => {
  let component: ModalAddEditExperienceComponent;
  let fixture: ComponentFixture<ModalAddEditExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddEditExperienceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddEditExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
