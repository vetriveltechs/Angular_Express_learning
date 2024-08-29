import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LovComponent } from './lov.component';

describe('LovComponent', () => {
  let component: LovComponent;
  let fixture: ComponentFixture<LovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LovComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
