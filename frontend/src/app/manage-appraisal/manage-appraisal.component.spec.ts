import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAppraisalComponent } from './manage-appraisal.component';

describe('ManageAppraisalComponent', () => {
  let component: ManageAppraisalComponent;
  let fixture: ComponentFixture<ManageAppraisalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAppraisalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
