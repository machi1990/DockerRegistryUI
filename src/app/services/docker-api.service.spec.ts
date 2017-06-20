/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DockerAPIService } from './docker-api.service';

describe('Service: DockerAPI', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DockerAPIService]
    });
  });

  it(
    'should ...',
    inject([DockerAPIService], (service: DockerAPIService) => {
      expect(service).toBeTruthy();
    })
  );
});
