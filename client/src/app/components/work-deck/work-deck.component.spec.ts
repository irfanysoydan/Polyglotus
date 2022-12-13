import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkDeckComponent } from './work-deck.component';

describe('WorkDeckComponent', () => {
  let component: WorkDeckComponent;
  let fixture: ComponentFixture<WorkDeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkDeckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
