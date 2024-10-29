import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivationalPhrasesComponent } from './motivational-phrases.component';

describe('MotivationalPhrasesComponent', () => {
  let component: MotivationalPhrasesComponent;
  let fixture: ComponentFixture<MotivationalPhrasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotivationalPhrasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotivationalPhrasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
