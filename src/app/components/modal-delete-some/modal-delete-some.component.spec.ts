import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteSomeComponent } from './modal-delete-some.component';

describe('ModalDeleteSomeComponent', () => {
  let component: ModalDeleteSomeComponent;
  let fixture: ComponentFixture<ModalDeleteSomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDeleteSomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteSomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
