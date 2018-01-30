import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInquiryComponent } from './customer-inquiry.component';

describe('CustomerInquiryComponent', () => {
  let component: CustomerInquiryComponent;
  let fixture: ComponentFixture<CustomerInquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerInquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
