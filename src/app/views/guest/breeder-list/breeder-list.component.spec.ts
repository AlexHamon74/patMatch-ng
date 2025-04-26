import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreederListComponent } from './breeder-list.component';

describe('BreederListComponent', () => {
  let component: BreederListComponent;
  let fixture: ComponentFixture<BreederListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreederListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreederListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
