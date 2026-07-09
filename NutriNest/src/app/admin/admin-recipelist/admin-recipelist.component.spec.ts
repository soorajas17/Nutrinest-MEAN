import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRecipelistComponent } from './admin-recipelist.component';

describe('AdminRecipelistComponent', () => {
  let component: AdminRecipelistComponent;
  let fixture: ComponentFixture<AdminRecipelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRecipelistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRecipelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
