import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobListingUserComponent } from './job-listing-provider.component';

describe('JobListingUserComponent', () => {
  let component: JobListingUserComponent;
  let fixture: ComponentFixture<JobListingUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobListingUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobListingUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
