import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearsMultipleWinnersComponent } from './years-multiple-winners.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HttpRequestService } from "../../../../services/http-request/http-request.service";
import { By } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";

describe('YearsMultipleWinnersComponent', () => {
  let component: YearsMultipleWinnersComponent;
  let fixture: ComponentFixture<YearsMultipleWinnersComponent>;
  let httpRequestService: HttpRequestService;
  let http: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearsMultipleWinnersComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearsMultipleWinnersComponent);
    httpRequestService = TestBed.inject(HttpRequestService);
    http = TestBed.inject(HttpClient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should request years with multiple winners from the API', () => {
    const spyRequest = spyOn(httpRequestService, 'requestAPI').and.callThrough();
    const spy = spyOn(http, 'get').and.callThrough();
    component.getWinners();
    expect(spyRequest).toHaveBeenCalledWith(component.params);
    expect(spy).toHaveBeenCalledWith(httpRequestService.url + component.params);
  });

  it('should have a card', () => {
    expect(fixture.nativeElement.querySelector('.card-item')).toBeTruthy();
  });

  it('should have a card title', () => {
    const element = fixture.nativeElement.querySelector('.card-title');
    expect(element.textContent).toEqual('List years with multiple winners');
  });

  it('should have a table', () => {
    const element = fixture.nativeElement.querySelector('.table');
    expect(element).toBeTruthy();
  });

  it('should have a table header with 2 columns and specific titles', () => {
    const element = fixture.debugElement.query(By.css('thead'));
    expect(element).toBeTruthy();
    const columns = element.nativeElement.children[0].children;
    expect(columns.length).toEqual(2);
    expect(columns[0].textContent).toEqual('Year');
    expect(columns[1].textContent).toEqual('Win Count');
  });

  it('should have a table body with specific values', () => {
    const element = fixture.debugElement.query(By.css('tbody'));
    expect(element).toBeTruthy();
    component.list.years = [
      {year: 2020, winnerCount: 1}
    ];
    fixture.detectChanges();
    const rows = element.nativeElement.children;
    expect(rows.length).toEqual(1);
    const row = rows[0];
    expect(row.children.length).toEqual(2);
    expect(row.children[0].textContent).toEqual('2020');
    expect(row.children[1].textContent).toEqual('1');
  });
});
