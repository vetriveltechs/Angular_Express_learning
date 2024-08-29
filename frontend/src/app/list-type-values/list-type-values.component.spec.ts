import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypeValuesComponent } from './list-type-values.component';

describe('ListTypeValuesComponent', () => {
  let component: ListTypeValuesComponent;
  let fixture: ComponentFixture<ListTypeValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTypeValuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTypeValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
