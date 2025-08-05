import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodSignaturesItemComponent } from './food-signatures-item.component';

describe('FoodSignaturesItemComponent', () => {
  let component: FoodSignaturesItemComponent;
  let fixture: ComponentFixture<FoodSignaturesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodSignaturesItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodSignaturesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
