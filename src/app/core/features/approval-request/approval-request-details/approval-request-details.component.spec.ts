import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalRequestDetailsComponent } from './approval-request-details.component';

describe('ApprovalRequestDetailsComponent', () => {
  let component: ApprovalRequestDetailsComponent;
  let fixture: ComponentFixture<ApprovalRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovalRequestDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApprovalRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
