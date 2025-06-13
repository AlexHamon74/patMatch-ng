import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesAdoptionsComponent } from './mes-adoptions.component';

describe('MesAdoptionsComponent', () => {
  let component: MesAdoptionsComponent;
  let fixture: ComponentFixture<MesAdoptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesAdoptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesAdoptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
