import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileProviderComponent } from './edit-profile-provider.component';

describe('EditProfileProviderComponent', () => {
  let component: EditProfileProviderComponent;
  let fixture: ComponentFixture<EditProfileProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfileProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
