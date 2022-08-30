import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxUserComponent } from './inbox-user.component';

describe('InboxUserComponent', () => {
  let component: InboxUserComponent;
  let fixture: ComponentFixture<InboxUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InboxUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
