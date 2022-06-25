import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddEditSkillComponent } from './modal-add-edit-skill.component';

describe('ModalAddEditSkillComponent', () => {
  let component: ModalAddEditSkillComponent;
  let fixture: ComponentFixture<ModalAddEditSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddEditSkillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddEditSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
