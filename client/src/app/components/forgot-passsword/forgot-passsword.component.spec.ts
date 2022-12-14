import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPassswordComponent } from './forgot-passsword.component';

describe('ForgotPassswordComponent', () => {
  let component: ForgotPassswordComponent;
  let fixture: ComponentFixture<ForgotPassswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPassswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPassswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
