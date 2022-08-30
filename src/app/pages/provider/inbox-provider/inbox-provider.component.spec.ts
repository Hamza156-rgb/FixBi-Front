import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxProviderComponent } from './inbox-provider.component';

describe('InboxProviderComponent', () => {
  let component: InboxProviderComponent;
  let fixture: ComponentFixture<InboxProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InboxProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
