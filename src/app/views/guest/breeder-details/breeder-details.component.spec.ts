import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreederDetailsComponent } from './breeder-details.component';

describe('BreederDetailsComponent', () => {
  let component: BreederDetailsComponent;
  let fixture: ComponentFixture<BreederDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreederDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreederDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
