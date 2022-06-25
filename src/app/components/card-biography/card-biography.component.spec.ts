import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBiographyComponent } from './card-biography.component';

describe('CardBiographyComponent', () => {
  let component: CardBiographyComponent;
  let fixture: ComponentFixture<CardBiographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardBiographyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBiographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
