import { TestBed } from '@angular/core/testing';

import { UserCameraService } from './user-camera.service';

describe('UserCameraService', () => {
  let service: UserCameraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCameraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
