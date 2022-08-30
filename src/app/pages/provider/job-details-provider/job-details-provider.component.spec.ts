import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetailsProviderComponent } from './job-details-provider.component';

describe('EditJobsUserComponent', () => {
  let component: JobDetailsProviderComponent;
  let fixture: ComponentFixture<JobDetailsProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobDetailsProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDetailsProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
