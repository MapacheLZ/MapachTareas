import { TestBed } from '@angular/core/testing';
import { HoraApiService } from './hora-api';

describe('HoraApiService', () => {
  let service: HoraApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoraApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
