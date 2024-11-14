import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarboxComponent } from './carbox.component';

describe('CarboxComponent', () => {
  let component: CarboxComponent;
  let fixture: ComponentFixture<CarboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
