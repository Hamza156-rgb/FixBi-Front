import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsCompletedProviderComponent } from './jobs-completed-provider.component';

describe('JobsCompletedProviderComponent', () => {
  let component: JobsCompletedProviderComponent;
  let fixture: ComponentFixture<JobsCompletedProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsCompletedProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsCompletedProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
