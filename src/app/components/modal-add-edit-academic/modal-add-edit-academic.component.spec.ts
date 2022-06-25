import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddEditAcademicComponent } from './modal-add-edit-academic.component';

describe('ModalAddEditAcademicComponent', () => {
  let component: ModalAddEditAcademicComponent;
  let fixture: ComponentFixture<ModalAddEditAcademicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddEditAcademicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddEditAcademicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
