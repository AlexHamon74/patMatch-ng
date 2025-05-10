import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBreederComponent } from './header-breeder.component';

describe('HeaderBreederComponent', () => {
  let component: HeaderBreederComponent;
  let fixture: ComponentFixture<HeaderBreederComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderBreederComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderBreederComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
