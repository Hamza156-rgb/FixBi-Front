import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageJobsUserComponent } from './manage-jobs-user.component';

describe('ManageJobsUserComponent', () => {
  let component: ManageJobsUserComponent;
  let fixture: ComponentFixture<ManageJobsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageJobsUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageJobsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
