import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRequestAddComponent } from './leave-request-add.component';

describe('LeaveRequestAddComponent', () => {
  let component: LeaveRequestAddComponent;
  let fixture: ComponentFixture<LeaveRequestAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveRequestAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeaveRequestAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
