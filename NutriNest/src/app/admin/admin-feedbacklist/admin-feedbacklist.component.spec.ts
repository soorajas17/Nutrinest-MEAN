import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFeedbacklistComponent } from './admin-feedbacklist.component';

describe('AdminFeedbacklistComponent', () => {
  let component: AdminFeedbacklistComponent;
  let fixture: ComponentFixture<AdminFeedbacklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFeedbacklistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFeedbacklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
