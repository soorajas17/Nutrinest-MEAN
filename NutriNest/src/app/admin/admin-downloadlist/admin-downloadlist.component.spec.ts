import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDownloadlistComponent } from './admin-downloadlist.component';

describe('AdminDownloadlistComponent', () => {
  let component: AdminDownloadlistComponent;
  let fixture: ComponentFixture<AdminDownloadlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDownloadlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDownloadlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
