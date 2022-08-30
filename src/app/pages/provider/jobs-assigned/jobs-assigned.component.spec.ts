import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsAssignedComponent } from './jobs-assigned.component';

describe('JobsAssignedComponent', () => {
  let component: JobsAssignedComponent;
  let fixture: ComponentFixture<JobsAssignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsAssignedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
