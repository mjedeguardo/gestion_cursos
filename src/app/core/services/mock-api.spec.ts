import { TestBed } from '@angular/core/testing';
import { MockApiService } from './mock-api';

describe('MockApi', () => {
  let service: MockApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
