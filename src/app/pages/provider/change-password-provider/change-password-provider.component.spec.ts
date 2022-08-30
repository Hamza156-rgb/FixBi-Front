import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordProviderComponent } from './change-password-provider.component';

describe('ChangePasswordProviderComponent', () => {
  let component: ChangePasswordProviderComponent;
  let fixture: ComponentFixture<ChangePasswordProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePasswordProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
