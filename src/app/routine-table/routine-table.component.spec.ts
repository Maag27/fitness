import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineTableComponent } from './routine-table.component';

describe('RoutineTableComponent', () => {
  let component: RoutineTableComponent;
  let fixture: ComponentFixture<RoutineTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutineTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutineTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
