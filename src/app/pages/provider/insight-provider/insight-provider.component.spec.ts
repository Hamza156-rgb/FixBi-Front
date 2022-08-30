import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightProviderComponent } from './insight-provider.component';

describe('InsightProviderComponent', () => {
  let component: InsightProviderComponent;
  let fixture: ComponentFixture<InsightProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsightProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsightProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
