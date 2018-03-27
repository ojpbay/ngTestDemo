
import { MockBackend } from '@angular/http/testing';
import { Http, ConnectionBackend, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { tick, fakeAsync } from '@angular/core/testing';
import { inject, TestBed } from '@angular/core/testing';
import { SearchService } from './search.service';

describe('SearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(backend, defaultOptions);
        }, deps: [MockBackend, BaseRequestOptions]
        },
        {provide: SearchService, useClass: SearchService},
        {provide: MockBackend, useClass: MockBackend},
        {provide: BaseRequestOptions, useClass: BaseRequestOptions}
      ]
    });
  });

  it('should retrieve all search results',
    inject([SearchService, MockBackend], fakeAsync((searchService: SearchService, mockBackend: MockBackend) => {
      let res: Response;
      mockBackend.connections.subscribe(c => {
        expect(c.request.url).toBe('app/shared/data/people.json');
        let response = new ResponseOptions({body: '[{"name": "John Elway"}, {"name": "Gary Kubiak"}]'});
        c.mockRespond(new Response(response));
      });
      searchService.getAll().subscribe((response) => {
        res = response;
      });
      tick();
      expect(res[0].name).toBe('John Elway');
    }))
  );

  it('should get specific id',
  inject([SearchService, MockBackend], fakeAsync((searchService: SearchService, mockBackend: MockBackend) => {
    let res;
    let id = 3;
    mockBackend.connections.subscribe(c => {
      expect(c.request.url).toBe('app/shared/data/people.json');
      let response = new ResponseOptions({body: '[{"id": 3, "name": "Test Elway"}]'});
      c.mockRespond(new Response(response));
    });
    searchService.get(3).subscribe((response) => {
      res = response;
    });
    tick();
    expect(res[0]).toBeTruthy();
    expect(res[0].name).toBe('Test Elway');
  }))
);

  it('should be created', inject([SearchService], (service: SearchService) => {
    expect(service).toBeTruthy();
  }));
});
