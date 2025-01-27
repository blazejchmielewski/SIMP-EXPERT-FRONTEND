import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertiseCreateComponent } from './expertise-create.component';

describe('ExpertiseCreateComponent', () => {
  let component: ExpertiseCreateComponent;
  let fixture: ComponentFixture<ExpertiseCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertiseCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertiseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
