import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJobsUserComponent } from './edit-jobs-user.component';

describe('EditJobsUserComponent', () => {
  let component: EditJobsUserComponent;
  let fixture: ComponentFixture<EditJobsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditJobsUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditJobsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
