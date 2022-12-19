import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleGuardComponent } from './role-guard.component';

describe('RoleGuardComponent', () => {
  let component: RoleGuardComponent;
  let fixture: ComponentFixture<RoleGuardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleGuardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleGuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
