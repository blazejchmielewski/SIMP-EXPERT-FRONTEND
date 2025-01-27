import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertiseDetailsComponent } from './expertise-details.component';

describe('ExpertiseDetailsComponent', () => {
  let component: ExpertiseDetailsComponent;
  let fixture: ComponentFixture<ExpertiseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertiseDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertiseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
