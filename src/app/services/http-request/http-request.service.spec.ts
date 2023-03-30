import { TestBed } from '@angular/core/testing';

import { HttpRequestService } from './http-request.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HttpClient } from "@angular/common/http";

describe('HttpRequestService', () => {
  let service: HttpRequestService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HttpRequestService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make GET requests to base API url', () => {
    const spy = spyOn(http, 'get').and.callThrough();
    service.requestAPI('');
    expect(spy).toHaveBeenCalledWith(service.url);
  });
});
