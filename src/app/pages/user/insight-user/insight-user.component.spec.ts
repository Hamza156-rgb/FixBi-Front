import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightUserComponent } from './insight-user.component';

describe('InsightUserComponent', () => {
  let component: InsightUserComponent;
  let fixture: ComponentFixture<InsightUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsightUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsightUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
