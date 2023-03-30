import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnersByYearComponent } from './winners-by-year.component';
import { HttpRequestService } from "../../../../services/http-request/http-request.service";
import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";

describe('WinnersByYearComponent', () => {
  let component: WinnersByYearComponent;
  let fixture: ComponentFixture<WinnersByYearComponent>;
  let httpRequestService: HttpRequestService;
  let http: HttpClient;
  let input: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinnersByYearComponent ],
      imports: [HttpClientTestingModule, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinnersByYearComponent);
    httpRequestService = TestBed.inject(HttpRequestService);
    http = TestBed.inject(HttpClient);
    component = fixture.componentInstance;
    fixture.detectChanges();
    input = fixture.nativeElement.querySelector('input');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a card', () => {
    expect(fixture.nativeElement.querySelector('.card-item')).toBeTruthy();
  });

  it('should have a card title', () => {
    const element = fixture.nativeElement.querySelector('.card-title');
    expect(element.textContent).toEqual('List movie winners by year');
  });

  it('should have an input', () => {
    expect(input).toBeTruthy();
  });

  it('should have a send button', () => {
    expect(fixture.debugElement.query(By.css('#btn-send'))).toBeTruthy();
  });

  it('should not show clear button when input is empty', () => {
    component.year = '';
    fixture.detectChanges();
    const btnClear = fixture.debugElement.query(By.css('#btn-clear'));
    expect(btnClear).toBeFalsy();
  });

  it('should show clear button when input is not empty', () => {
    component.year = '2021';
    fixture.detectChanges();
    const btnClear = fixture.debugElement.query(By.css('#btn-clear'));
    expect(btnClear).toBeTruthy();
  });

  it('should clear input when button is clicked and hide table', () => {
    component.year = '2021';
    fixture.detectChanges();
    const btnClear = fixture.debugElement.query(By.css('#btn-clear'));
    btnClear.triggerEventHandler('click', null);
    expect(input.value).withContext('input cleared').toEqual('');
    expect(component.year).withContext('year var cleared').toEqual('');

    // should not show table
    const table = fixture.nativeElement.querySelector('.table');
    expect(table).withContext('hide table').toBeFalsy();
  });

  it('should not send request when input is empty', () => {
    component.year = '';
    fixture.detectChanges();
    const spyRequest = spyOn(httpRequestService, 'requestAPI').and.callThrough();
    const btnSend = fixture.debugElement.query(By.css('#btn-send'));
    btnSend.triggerEventHandler('click', null);
    expect(spyRequest).not.toHaveBeenCalled();
  })

  it('should show table header with loading when button is clicked', () => {
    component.year = '2021';
    fixture.detectChanges();

    // button clicked
    const btnSend = fixture.debugElement.query(By.css('#btn-send'));
    btnSend.triggerEventHandler('click', null);

    // fake getWinnerMoviesByYear called
    component.loading = true;
    component.searched = true;
    fixture.detectChanges();
    expect(component.loading).withContext('loading true').toBeTruthy();
    expect(component.searched).withContext('searched true').toBeTruthy();

    // should show a table
    const table = fixture.nativeElement.querySelector('.table');
    expect(table).withContext('show table').toBeTruthy();

    // should show header with 3 columns
    const thead = fixture.debugElement.query(By.css('thead'));
    expect(thead).withContext('table have header').toBeTruthy();
    const columns = thead.nativeElement.children[0].children;
    expect(columns.length).withContext('table header with 3 columns').toEqual(3);
    expect(columns[0].textContent).withContext('column 1 called Id').toEqual('Id');
    expect(columns[1].textContent).withContext('column 2 called Year').toEqual('Year');
    expect(columns[2].textContent).withContext('column 3 called Title').toEqual('Title');

    // should show table body
    const tbody = fixture.debugElement.query(By.css('tbody'));
    expect(tbody).withContext('table have body').toBeTruthy();
    const rows = tbody.nativeElement.children;

    // should show loading
    expect(rows.length).withContext('table body with 1 rows').toEqual(1);
    expect(rows[0].children.length).withContext('table body with 1 column').toEqual(1);
    const loading = fixture.debugElement.query(By.css('.fa-spinner'));
    expect(loading).withContext('table with loading').toBeTruthy();

    // should hide loading after finish API request
    // fake getWinnerMoviesByYear finished
    component.loading = false;
    fixture.detectChanges();
    expect(component.loading).withContext('loading false').toBeFalse();
    const loadingHidden = fixture.debugElement.query(By.css('.fa-spinner'));
    expect(loadingHidden).withContext('table without loading').toBeFalsy();
  });

  it('should show table header with loading and send request when button is clicked', () => {
    component.year = '2021';
    fixture.detectChanges();

    const spyGetMovies = spyOn(component, 'getWinnerMoviesByYear').and.callThrough();
    const spyRequest = spyOn(httpRequestService, 'requestAPI').and.callThrough();
    const spy = spyOn(http, 'get').and.callThrough();

    // button clicked
    const btnSend = fixture.debugElement.query(By.css('#btn-send'));
    btnSend.triggerEventHandler('click', null);

    // should request API
    expect(spyGetMovies).withContext('getWinnerMoviesByYear called').toHaveBeenCalled();
    const params = `?winner=true&year=${component.year}`;
    expect(spyRequest).withContext('call requestAPI() function').toHaveBeenCalledWith(params);
    expect(spy).withContext('call get API').toHaveBeenCalledWith(httpRequestService.url + params);
  })

  it('should show no results message in the table body when API returns no results', () => {
    component.list = [];
    component.searched = true;
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('tbody'));
    expect(element).withContext('table have body').toBeTruthy();
    const rows = element.nativeElement.children;
    expect(rows.length).withContext('body with 1 row').toEqual(1);
    const row = rows[0];
    expect(row.children.length).withContext('body with 1 column').toEqual(1);
    const noResults = fixture.debugElement.query(By.css('#no-results'));
    expect(noResults).withContext('no results found').toBeTruthy();
  });

  it('should have a table body with specific values', () => {
    component.list = [
      {
        id: 1,
        year: 1980,
        title: "Can't Stop the Music",
        studios: [
          "Associated Film Distribution"
        ],
        producers: [
          "Allan Carr"
        ],
        winner: true
      }
    ];
    component.searched = true;
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('tbody'));
    expect(element).withContext('table have body').toBeTruthy();
    const rows = element.nativeElement.children;
    expect(rows.length).withContext('body with 1 row').toEqual(1);
    const row = rows[0];
    expect(row.children.length).withContext('body with 3 columns').toEqual(3);
    expect(row.children[0].textContent).withContext('column 1 with value 1').toEqual('1');
    expect(row.children[1].textContent).withContext('column 2 with value 1980').toEqual('1980');
    expect(row.children[2].textContent).withContext('column 3 with value Can\'t Stop the Music').toEqual('Can\'t Stop the Music');
  });
});
