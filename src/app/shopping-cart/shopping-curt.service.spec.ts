import { TestBed } from '@angular/core/testing';

import { ShoppingCurtService } from './shopping-curt.service';

describe('ShoppingCurtService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShoppingCurtService = TestBed.get(ShoppingCurtService);
    expect(service).toBeTruthy();
  });
});
