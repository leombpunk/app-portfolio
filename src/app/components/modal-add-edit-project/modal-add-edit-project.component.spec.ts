import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddEditProjectComponent } from './modal-add-edit-project.component';

describe('ModalAddEditProjectComponent', () => {
  let component: ModalAddEditProjectComponent;
  let fixture: ComponentFixture<ModalAddEditProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddEditProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddEditProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
