import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenueditsComponent } from './menuedits.component';

describe('MenueditsComponent', () => {
  let component: MenueditsComponent;
  let fixture: ComponentFixture<MenueditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenueditsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenueditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
