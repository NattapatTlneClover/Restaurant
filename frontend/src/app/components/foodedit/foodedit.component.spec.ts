import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodeditComponent } from './foodedit.component';

describe('FoodeditComponent', () => {
  let component: FoodeditComponent;
  let fixture: ComponentFixture<FoodeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodeditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
