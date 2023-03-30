import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopWinnersStudiosComponent } from './top-winners-studios.component';
import { HttpRequestService } from "../../../../services/http-request/http-request.service";
import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { By } from "@angular/platform-browser";

describe('TopWinnersStudiosComponent', () => {
  let component: TopWinnersStudiosComponent;
  let fixture: ComponentFixture<TopWinnersStudiosComponent>;
  let httpRequestService: HttpRequestService;
  let http: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopWinnersStudiosComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopWinnersStudiosComponent);
    httpRequestService = TestBed.inject(HttpRequestService);
    http = TestBed.inject(HttpClient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should request top studio winners from the API', () => {
    const spyRequest = spyOn(httpRequestService, 'requestAPI').and.callThrough();
    const spy = spyOn(http, 'get').and.callThrough();
    component.getStudios();
    expect(spyRequest).toHaveBeenCalledWith(component.params);
    expect(spy).toHaveBeenCalledWith(httpRequestService.url + component.params);
  });

  it('should have a card', () => {
    expect(fixture.nativeElement.querySelector('.card-item')).toBeTruthy();
  });

  it('should have a card title', () => {
    const element = fixture.nativeElement.querySelector('.card-title');
    expect(element.textContent).toEqual('Top 3 studios with winners');
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
    expect(columns[0].textContent).toEqual('Name');
    expect(columns[1].textContent).toEqual('Win Count');
  });

  it('should have a table body with specific values', () => {
    const element = fixture.debugElement.query(By.css('tbody'));
    expect(element).toBeTruthy();
    component.list.studios = [
      { name: "Columbia Pictures", winCount: 7 },
      { name: "Paramount Pictures", winCount: 6 },
      { name: "Warner Bros.", winCount: 5 },
      { name: "20th Century Fox", winCount: 4 }
    ];
    fixture.detectChanges();
    const rows = element.children;
    // should have 3 rows in the table because of the slice:0:3 pipe
    expect(rows.length).toEqual(3);
    rows.forEach((row, index: number) => {
      expect(row.children.length).toEqual(2);
      expect(row.nativeElement.children[0].textContent).toEqual(
        index === 0 ? 'Columbia Pictures' :
          index === 1 ? 'Paramount Pictures' :
            'Warner Bros.'
      );
      expect(row.nativeElement.children[1].textContent).toEqual(
        index === 0 ? '7' :
          index === 1 ? '6' :
            '5'
      );
    })
  });
});
