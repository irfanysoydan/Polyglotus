import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewPasswordComponent } from './renew-password.component';

describe('RenewPasswordComponent', () => {
  let component: RenewPasswordComponent;
  let fixture: ComponentFixture<RenewPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenewPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
