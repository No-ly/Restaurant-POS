import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientModalComponent } from './ingredient-modal.component';

describe('IngredientModalComponent', () => {
  let component: IngredientModalComponent;
  let fixture: ComponentFixture<IngredientModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
