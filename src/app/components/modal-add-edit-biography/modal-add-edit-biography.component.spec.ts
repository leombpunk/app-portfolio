import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddEditBiographyComponent } from './modal-add-edit-biography.component';

describe('ModalAddEditBiographyComponent', () => {
  let component: ModalAddEditBiographyComponent;
  let fixture: ComponentFixture<ModalAddEditBiographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddEditBiographyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddEditBiographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
