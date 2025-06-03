import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeAdoptionComponent } from './demande-adoption.component';

describe('DemandeAdoptionComponent', () => {
  let component: DemandeAdoptionComponent;
  let fixture: ComponentFixture<DemandeAdoptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeAdoptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeAdoptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
