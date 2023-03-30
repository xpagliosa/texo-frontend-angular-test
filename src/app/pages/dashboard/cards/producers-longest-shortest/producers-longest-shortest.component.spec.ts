import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducersLongestShortestComponent } from './producers-longest-shortest.component';
import { HttpRequestService } from "../../../../services/http-request/http-request.service";
import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { By } from "@angular/platform-browser";

describe('ProducersLongestShortestComponent', () => {
  let component: ProducersLongestShortestComponent;
  let fixture: ComponentFixture<ProducersLongestShortestComponent>;
  let httpRequestService: HttpRequestService;
  let http: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProducersLongestShortestComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducersLongestShortestComponent);
    httpRequestService = TestBed.inject(HttpRequestService);
    http = TestBed.inject(HttpClient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should request producers interval wins from the API', () => {
    const spyRequest = spyOn(httpRequestService, 'requestAPI').and.callThrough();
    const spy = spyOn(http, 'get').and.callThrough();
    component.getProducers();
    expect(spyRequest).toHaveBeenCalledWith(component.params);
    expect(spy).toHaveBeenCalledWith(httpRequestService.url + component.params);
  });

  it('should have a card', () => {
    expect(fixture.nativeElement.querySelector('.card-item')).toBeTruthy();
  });

  it('should have a card title', () => {
    const element = fixture.nativeElement.querySelector('.card-title');
    expect(element.textContent).toEqual('Producers with longest and shortest interval between wins');
  });

  it('should have 2 subtitles', () => {
    const element = fixture.debugElement.queryAll(By.css('h5'));
    expect(element.length).toEqual(2);
    expect(element[0].nativeElement.textContent).toEqual('Maximum');
    expect(element[1].nativeElement.textContent).toEqual('Minimum');
  });

  it('should have a table', () => {
    const element = fixture.nativeElement.querySelector('.table');
    expect(element).toBeTruthy();
  });

  it('should have 2 table headers with 4 columns each and specific titles', () => {
    const elements = fixture.debugElement.queryAll(By.css('thead'));
    expect(elements.length).toEqual(2);
    elements.forEach(element => {
      const columns = element.nativeElement.children[0].children;
      expect(columns.length).toEqual(4);
      expect(columns[0].textContent).toEqual('Producer');
      expect(columns[1].textContent).toEqual('Interval');
      expect(columns[2].textContent).toEqual('Previews Year');
      expect(columns[3].textContent).toEqual('Following Year');
    });
  });

  it('should have a table body with specific values', () => {
    const elements = fixture.debugElement.queryAll(By.css('tbody'));
    expect(elements.length).toEqual(2);
    component.list = {
      min: [
        {
          producer: "Joel Silver",
          interval: 1,
          previousWin: 1990,
          followingWin: 1991
        }
      ],
      max: [
        {
          producer: "Matthew Vaughn",
          interval: 13,
          previousWin: 2002,
          followingWin: 2015
        }
      ]
    };
    fixture.detectChanges();
    elements.forEach((element, index) => {
      const rows = element.nativeElement.children;
      expect(rows.length).toEqual(1);
      const row = rows[0];
      expect(row.children.length).toEqual(4);
      expect(row.children[0].textContent).toEqual(index === 0 ? 'Matthew Vaughn' : 'Joel Silver');
      expect(row.children[1].textContent).toEqual(index === 0 ? '13' : '1');
      expect(row.children[2].textContent).toEqual(index === 0 ? '2002' : '1990');
      expect(row.children[3].textContent).toEqual(index === 0 ? '2015' : '1991');
    });
  });
});
