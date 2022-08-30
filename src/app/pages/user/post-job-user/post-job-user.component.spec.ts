import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostJobUserComponent } from './post-job-user.component';

describe('PostJobUserComponent', () => {
  let component: PostJobUserComponent;
  let fixture: ComponentFixture<PostJobUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostJobUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostJobUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
