import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRequestDetailsComponent } from './leave-request-details.component';

describe('LeaveRequestDetailsComponent', () => {
  let component: LeaveRequestDetailsComponent;
  let fixture: ComponentFixture<LeaveRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveRequestDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeaveRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
