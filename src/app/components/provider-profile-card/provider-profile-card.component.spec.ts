import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderProfileCardComponent } from './provider-profile-card.component';

describe('ProviderProfileCardComponent', () => {
  let component: ProviderProfileCardComponent;
  let fixture: ComponentFixture<ProviderProfileCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderProfileCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderProfileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
