import { TestBed } from '@angular/core/testing';

import { RoslynService } from './roslyn.service';

describe('RoslynService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoslynService = TestBed.get(RoslynService);
    expect(service).toBeTruthy();
  });
});
