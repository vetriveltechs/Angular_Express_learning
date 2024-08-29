import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupsComponent } from './setups.component';

describe('SetupsComponent', () => {
  let component: SetupsComponent;
  let fixture: ComponentFixture<SetupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
