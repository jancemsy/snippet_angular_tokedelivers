import { TestBed } from '@angular/core/testing';

import { PaymentGatewaysService } from './payment-gateways.service';

xdescribe('PaymentGatewaysService', () => {
  let service: PaymentGatewaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentGatewaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
