import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodSignaturesComponent } from './food-signatures.component';

describe('FoodSignaturesComponent', () => {
  let component: FoodSignaturesComponent;
  let fixture: ComponentFixture<FoodSignaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodSignaturesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodSignaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
