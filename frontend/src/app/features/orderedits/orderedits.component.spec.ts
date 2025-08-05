import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdereditsComponent } from './orderedits.component';

describe('OrdereditsComponent', () => {
  let component: OrdereditsComponent;
  let fixture: ComponentFixture<OrdereditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdereditsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdereditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
