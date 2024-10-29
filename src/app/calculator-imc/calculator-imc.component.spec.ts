import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorIMCComponent } from './calculator-imc.component';

describe('CalculatorIMCComponent', () => {
  let component: CalculatorIMCComponent;
  let fixture: ComponentFixture<CalculatorIMCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorIMCComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorIMCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
