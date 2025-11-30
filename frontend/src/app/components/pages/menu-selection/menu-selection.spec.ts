import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSelection } from './menu-selection';

describe('MenuSelection', () => {
  let component: MenuSelection;
  let fixture: ComponentFixture<MenuSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuSelection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuSelection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
