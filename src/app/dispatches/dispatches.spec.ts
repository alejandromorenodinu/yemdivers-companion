import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dispatches } from './dispatches';

describe('Dispatches', () => {
  let component: Dispatches;
  let fixture: ComponentFixture<Dispatches>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dispatches],
    }).compileComponents();

    fixture = TestBed.createComponent(Dispatches);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
