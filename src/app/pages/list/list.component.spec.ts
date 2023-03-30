import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { HttpRequestService } from "../../services/http-request/http-request.service";
import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let httpRequestService: HttpRequestService;
  let http: HttpClient;

  let params: string;
  let spyMovies: jasmine.Spy;
  let spyRequest: jasmine.Spy;
  let spy: jasmine.Spy;

  const initialList = {
    "content": [
      {
        "id": 1,
        "year": 1980,
        "title": "Can't Stop the Music",
        "studios": [
          "Associated Film Distribution"
        ],
        "producers": [
          "Allan Carr"
        ],
        "winner": true
      },
      {
        "id": 2,
        "year": 1980,
        "title": "Cruising",
        "studios": [
          "Lorimar Productions",
          "United Artists"
        ],
        "producers": [
          "Jerry Weintraub"
        ],
        "winner": false
      },
      {
        "id": 3,
        "year": 1980,
        "title": "The Formula",
        "studios": [
          "MGM",
          "United Artists"
        ],
        "producers": [
          "Steve Shagan"
        ],
        "winner": false
      },
      {
        "id": 4,
        "year": 1980,
        "title": "Friday the 13th",
        "studios": [
          "Paramount Pictures"
        ],
        "producers": [
          "Sean S. Cunningham"
        ],
        "winner": false
      },
      {
        "id": 5,
        "year": 1980,
        "title": "The Nude Bomb",
        "studios": [
          "Universal Studios"
        ],
        "producers": [
          "Jennings Lang"
        ],
        "winner": false
      },
      {
        "id": 6,
        "year": 1980,
        "title": "The Jazz Singer",
        "studios": [
          "Associated Film Distribution"
        ],
        "producers": [
          "Jerry Leider"
        ],
        "winner": false
      },
      {
        "id": 7,
        "year": 1980,
        "title": "Raise the Titanic",
        "studios": [
          "Associated Film Distribution"
        ],
        "producers": [
          "William Frye"
        ],
        "winner": false
      },
      {
        "id": 8,
        "year": 1980,
        "title": "Saturn 3",
        "studios": [
          "Associated Film Distribution"
        ],
        "producers": [
          "Stanley Donen"
        ],
        "winner": false
      },
      {
        "id": 9,
        "year": 1980,
        "title": "Windows",
        "studios": [
          "United Artists"
        ],
        "producers": [
          "Mike Lobell"
        ],
        "winner": false
      },
      {
        "id": 10,
        "year": 1980,
        "title": "Xanadu",
        "studios": [
          "Universal Studios"
        ],
        "producers": [
          "Lawrence Gordon"
        ],
        "winner": false
      },
      {
        "id": 11,
        "year": 1981,
        "title": "Mommie Dearest",
        "studios": [
          "Paramount Pictures"
        ],
        "producers": [
          "Frank Yablans"
        ],
        "winner": true
      },
      {
        "id": 12,
        "year": 1981,
        "title": "Endless Love",
        "studios": [
          "PolyGram",
          "Universal Studios"
        ],
        "producers": [
          "Dyson Lovell"
        ],
        "winner": false
      },
      {
        "id": 13,
        "year": 1981,
        "title": "Heaven's Gate",
        "studios": [
          "United Artists"
        ],
        "producers": [
          "Joann Carelli"
        ],
        "winner": false
      },
      {
        "id": 14,
        "year": 1981,
        "title": "The Legend of the Lone Ranger",
        "studios": [
          "Associated Film Distribution",
          "Universal Studios"
        ],
        "producers": [
          "Walter Coblenz"
        ],
        "winner": false
      },
      {
        "id": 15,
        "year": 1981,
        "title": "Tarzan, the Ape Man",
        "studios": [
          "MGM",
          "United Artists"
        ],
        "producers": [
          "John Derek"
        ],
        "winner": false
      }
    ],
    "pageable": {
      "sort": {
        "sorted": false,
        "unsorted": true,
        "empty": true
      },
      "offset": 0,
      "pageSize": 15,
      "pageNumber": 0,
      "paged": true,
      "unpaged": false
    },
    "totalPages": 14,
    "totalElements": 206,
    "last": false,
    "size": 15,
    "number": 0,
    "sort": {
      "sorted": false,
      "unsorted": true,
      "empty": true
    },
    "first": true,
    "numberOfElements": 15,
    "empty": false
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [HttpClientTestingModule, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    httpRequestService = TestBed.inject(HttpRequestService);
    http = TestBed.inject(HttpClient);
    component = fixture.componentInstance;
    component.loading = false;
    fixture.detectChanges();

    params = `?page=${component.page}&size=${component.limit}`;

    spyMovies = spyOn(component, 'getMovies').and.callThrough();
    spyRequest = spyOn(httpRequestService, 'requestAPI').and.callThrough();
    spy = spyOn(http, 'get').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading when start to get movies from API', () => {
    component.loading = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.fa-spinner')).toBeTruthy();
  });

  it('should have a card', () => {
    expect(fixture.nativeElement.querySelector('.card-item')).toBeTruthy();
  });

  it('should have a card title', () => {
    const element = fixture.nativeElement.querySelector('.card-title');
    expect(element.textContent).toEqual(' List movies ');
  });

  it('should have a table', () => {
    const element = fixture.nativeElement.querySelector('.table');
    expect(element).toBeTruthy();
  });

  it('should have a table header with 4 columns and specific titles', () => {
    const element = fixture.debugElement.query(By.css('thead'));
    expect(element).withContext('table have header').toBeTruthy();
    const columns = element.nativeElement.children[0].children;
    expect(columns.length).withContext('header with 4 columns').toEqual(4);
    expect(columns[0].textContent).withContext('column 1 with title ID').toEqual('ID');
    expect(columns[1].textContent).withContext('column 2 with title Year').toContain('Year');
    expect(columns[1].querySelector('input')).withContext('column 2 with Year input').toBeTruthy();
    expect(columns[2].textContent).withContext('column 3 with title Title').toEqual('Title');
    expect(columns[3].textContent).withContext('column 4 with title Winner?').toContain('Winner?');
    expect(columns[3].querySelector('select')).withContext('column 4 with Winner? select').toBeTruthy();
  });

  it('should not show clear button and enter text when input is empty', () => {
    component.year = '';
    fixture.detectChanges();
    const btnClear = fixture.debugElement.query(By.css('#btn-clear'));
    expect(btnClear).toBeFalsy();
    const enterText = fixture.debugElement.query(By.css('#enter-text'));
    expect(enterText).toBeFalsy();
  });

  it('should show clear button and enter text when input is not empty', () => {
    component.year = '2021';
    fixture.detectChanges();
    const btnClear = fixture.debugElement.query(By.css('#btn-clear'));
    expect(btnClear).toBeTruthy();
    const enterText = fixture.debugElement.query(By.css('#enter-text'));
    expect(enterText).toBeTruthy();
  });

  it('should clear input when button is clicked and list is not filtered by year', () => {
    component.year = '2021';
    component.filtered = false;
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    const btnClear = fixture.debugElement.query(By.css('#btn-clear'));
    btnClear.triggerEventHandler('click', null);
    expect(input.value).withContext('input cleared').toEqual('');
    expect(component.year).withContext('year var cleared').toEqual('');
  });

  it('should clear input and reload movie list when button is clicked and list is filtered by year', () => {
    component.year = '2021';
    component.filtered = true;
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    const btnClear = fixture.debugElement.query(By.css('#btn-clear'));
    btnClear.triggerEventHandler('click', null);
    expect(input.value).withContext('input cleared').toEqual('');
    expect(component.year).withContext('year var cleared').toEqual('');
    expect(component.page).withContext('page var equal 0').toEqual(0);
    expect(spyRequest).withContext('call requestAPI() function').toHaveBeenCalledWith(params);
    expect(spy).toHaveBeenCalledWith(httpRequestService.url + params);
  });

  // get movies when enter clicked

  it('should get movies from API without filters', () => {
    component.getMovies();
    // const params = `?page=${component.page}&size=${component.limit}`;
    expect(spyRequest).withContext('call requestAPI() function').toHaveBeenCalledWith(params);
    expect(spy).withContext('call get API').toHaveBeenCalledWith(httpRequestService.url + params);
  });

  it('should get movies from API with Year filter', () => {
    component.year = '1980';
    fixture.detectChanges();
    component.getMovies();
    params += `&year=${component.year}`;
    expect(spyRequest).withContext('call requestAPI() function').toHaveBeenCalledWith(params);
    expect(spy).withContext('call get API').toHaveBeenCalledWith(httpRequestService.url + params);
  });

  it('should get movies from API with Winner filter', () => {
    component.winner = true;
    fixture.detectChanges();
    component.getMovies();
    params += `&winner=${component.winner}`;
    expect(spyRequest).withContext('call requestAPI() function').toHaveBeenCalledWith(params);
    expect(spy).withContext('call get API').toHaveBeenCalledWith(httpRequestService.url + params);
  });

  it('should get movies from API with Year and Winner filter', () => {
    component.year = '1980';
    component.winner = true;
    fixture.detectChanges();
    component.getMovies();
    params += `&winner=${component.winner}&year=${component.year}`;
    expect(spyRequest).withContext('call requestAPI() function').toHaveBeenCalledWith(params);
    expect(spy).withContext('call get API').toHaveBeenCalledWith(httpRequestService.url + params);
  });

  it('should get movies from API with pagination', () => {
    component.page = 5;
    fixture.detectChanges();
    component.getMovies();
    params = `?page=${component.page}&size=${component.limit}`;
    expect(spyRequest).withContext('call requestAPI() function').toHaveBeenCalledWith(params);
    expect(spy).withContext('call get API').toHaveBeenCalledWith(httpRequestService.url + params);
  });

  it('should have a table body with 15 rows and specific column values', () => {
    component.filtered = true;
    component.list = initialList;
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('tbody'));
    expect(element).withContext('table have body').toBeTruthy();
    const rows = element.nativeElement.children;
    expect(rows.length).withContext('body with 15 row').toEqual(15);
    const row = rows[0];
    expect(row.children.length).withContext('body with 4 columns').toEqual(4);
    expect(row.children[0].textContent).withContext('column 1 with text 1').toEqual('1');
    expect(row.children[1].textContent).withContext('column 2 with text 1980').toEqual('1980');
    expect(row.children[2].textContent).withContext('column 3 with text Can\'t Stop the Music').toEqual('Can\'t Stop the Music');
    expect(row.children[3].textContent).withContext('column 4 with text Yes').toEqual('Yes');
  });

  it('should have a table footer with 1 row, first, previous, next, last and more 14 pagination pages buttons', () => {
    component.filtered = true;
    component.list = initialList;
    component.pages = Array.from(Array(component.list.totalPages + 1).keys()).splice(1);
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('tfoot'));
    expect(element).withContext('table have footer').toBeTruthy();
    const rows = element.nativeElement.children;
    expect(rows.length).withContext('footer have 1 row').toEqual(1);
    const row = rows[0];
    expect(row.children.length).withContext('footer have 1 column').toEqual(1);

    // should have first, previous, next and last pagination buttons
    const first = fixture.debugElement.query(By.css('#first'));
    const previous = fixture.debugElement.query(By.css('#previous'));
    const next = fixture.debugElement.query(By.css('#next'));
    const last = fixture.debugElement.query(By.css('#last'));

    expect(first).withContext('first pagination button').toBeTruthy();
    expect(previous).withContext('previous pagination button').toBeTruthy();
    expect(next).withContext('next pagination button').toBeTruthy();
    expect(last).withContext('last pagination button').toBeTruthy();

    // should have 14 page number buttons
    const pageNumbers = fixture.debugElement.queryAll(By.css('.page-number'));
    expect(pageNumbers.length).withContext('14 page number buttons').toEqual(14);

    // active page should be highlighted
    const activePage = pageNumbers[component.page];
    expect(activePage.nativeElement.classList).withContext('active pagination button number highlighted').toContain('active');

    // first and previous buttons should be disabled when in the first page
    expect(first.nativeElement.classList).withContext('first pagination button disabled').toContain('disabled');
    expect(previous.nativeElement.classList).withContext('first pagination button disabled').toContain('disabled');

    // next and last buttons should be disabled when in the last page
    component.list = { ...component.list, last: true, first: false };
    fixture.detectChanges();
    expect(next.nativeElement.classList).withContext('next pagination button disabled').toContain('disabled');
    expect(last.nativeElement.classList).withContext('next pagination button disabled').toContain('disabled');
  });

  it('should get movies when click first button in pagination', () => {
    component.list = { ...initialList, first: false, last: false};
    component.pages = Array.from(Array(component.list.totalPages + 1).keys()).splice(1);
    component.page = 5;
    component.filtered = true;
    fixture.detectChanges();

    // first button clicked
    const first = fixture.debugElement.query(By.css('#first'));
    first.triggerEventHandler('click', null);
    expect(spyMovies).withContext('call get API').toHaveBeenCalled();
    expect(component.page).withContext('page should be 0').toEqual(0);
    params = `?page=${component.page}&size=${component.limit}`;
    expect(spyRequest).withContext('call requestAPI() function').toHaveBeenCalledWith(params);
    expect(spy).withContext('call get API').toHaveBeenCalledWith(httpRequestService.url + params);
  });

  it('should get movies when click previous button in pagination', () => {
    component.list = { ...initialList, first: false, last: false};
    component.pages = Array.from(Array(component.list.totalPages + 1).keys()).splice(1);
    component.page = 5;
    component.filtered = true;
    fixture.detectChanges();

    // previous button clicked
    const previous = fixture.debugElement.query(By.css('#previous'));
    const currentPage = component.page;
    previous.triggerEventHandler('click', null);
    expect(spyMovies).withContext('call get API').toHaveBeenCalled();
    expect(component.page).withContext('page should be current page - 1').toEqual(currentPage - 1);
    params = `?page=${component.page}&size=${component.limit}`;
    expect(spyRequest).withContext('call requestAPI() function').toHaveBeenCalledWith(params);
    expect(spy).withContext('call get API').toHaveBeenCalledWith(httpRequestService.url + params);
  });

  it('should get movies when click next button in pagination', () => {
    component.list = { ...initialList, first: false, last: false};
    component.pages = Array.from(Array(component.list.totalPages + 1).keys()).splice(1);
    component.page = 5;
    component.filtered = true;
    fixture.detectChanges();

    const currentPage = component.page;
    const next = fixture.debugElement.query(By.css('#next'));
    next.triggerEventHandler('click', null);
    expect(spyMovies).withContext('call get API').toHaveBeenCalled();
    expect(component.page).withContext('page should be current page + 1').toEqual(currentPage + 1);
    params = `?page=${component.page}&size=${component.limit}`;
    expect(spyRequest).withContext('call requestAPI() function').toHaveBeenCalledWith(params);
    expect(spy).withContext('call get API').toHaveBeenCalledWith(httpRequestService.url + params);
  });

  it('should get movies when click last button in pagination', () => {
    component.list = { ...initialList, first: false, last: false};
    component.pages = Array.from(Array(component.list.totalPages + 1).keys()).splice(1);
    component.page = 5;
    component.filtered = true;
    fixture.detectChanges();

    // last button clicked
    const totalPages = component.list.totalPages - 1
    const last = fixture.debugElement.query(By.css('#last'));
    last.triggerEventHandler('click', null);
    expect(spyMovies).withContext('call get API').toHaveBeenCalled();
    expect(component.page).withContext('page should be list.totalPages - 1').toEqual(totalPages);
    params = `?page=${component.page}&size=${component.limit}`;
    expect(spyRequest).withContext('call requestAPI() function').toHaveBeenCalledWith(params);
    expect(spy).withContext('call get API').toHaveBeenCalledWith(httpRequestService.url + params);
  });

  it('should get movies when click in a page number button in pagination', () => {
    component.list = { ...initialList, first: false, last: false};
    component.pages = Array.from(Array(component.list.totalPages + 1).keys()).splice(1);
    component.page = 5;
    component.filtered = true;
    fixture.detectChanges();

    const pageNumbers = fixture.debugElement.queryAll(By.css('.page-number'));
    pageNumbers[3].triggerEventHandler('click', null);
    expect(spyMovies).withContext('call get API').toHaveBeenCalled();
    expect(component.page).withContext('page should be 3').toEqual(3);
    params = `?page=${component.page}&size=${component.limit}`;
    expect(spyRequest).withContext('call requestAPI() function').toHaveBeenCalledWith(params);
    expect(spy).withContext('call get API').toHaveBeenCalledWith(httpRequestService.url + params);
  });

  it('should accept only numbers on input - onlyNumbers', () => {
    component.filtered = false;
    component.year = '1980';
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    input.value = component.year;
    const event = new KeyboardEvent("keydown",{
      "key": "a"
    });
    input.dispatchEvent(event);
    fixture.detectChanges();
    expect(input.value).withContext('input only numbers value equal 1980').toEqual('1980');
    expect(component.year).withContext('year value equal 1980').toEqual('1980');
  });

  it('should get movies when insert a valid year and press enter on input', () => {
    component.filtered = false;
    component.year = '1980';
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    input.value = component.year;
    const event = new KeyboardEvent("keydown",{
      "key": "enter"
    });
    input.dispatchEvent(event);
    fixture.detectChanges();
    expect(input.value).withContext('input only numbers value equal 1980').toEqual('1980');
    expect(component.year).withContext('year value equal 1980').toEqual('1980');
    params += `&year=${component.year}`;
    expect(spyRequest).withContext('call requestAPI() function').toHaveBeenCalledWith(params);
    expect(spy).withContext('call get API').toHaveBeenCalledWith(httpRequestService.url + params);
  });

  it('should insert a red border on input when type an invalid year - checkIsValidYear', () => {
    component.filtered = false;
    component.year = '19800';
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    input.value = component.year;
    const event = new KeyboardEvent("keydown",{
      "key": "enter"
    });
    input.dispatchEvent(event);
    fixture.detectChanges();
    expect(input.value).withContext('input only numbers value equal 1980').toEqual('19800');
    expect(component.year).withContext('year value equal 1980').toEqual('19800');
    expect(input.classList).withContext('input with red border').toContain('border-danger');
  });

  it('should insert a red border on input when type a year in the future - checkIsValidYear', () => {
    const oneYearFromNow = (new Date().getFullYear() + 1).toString()
    component.filtered = false;
    component.year = oneYearFromNow;
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    input.value = component.year;
    const event = new KeyboardEvent("keydown",{
      "key": "enter"
    });
    input.dispatchEvent(event);
    fixture.detectChanges();
    expect(input.value).withContext(`input only numbers value equal ${oneYearFromNow}`).toEqual(oneYearFromNow);
    expect(component.year).withContext(`year value equal ${oneYearFromNow}`).toEqual(oneYearFromNow);
    expect(input.classList).withContext('input with red border').toContain('border-danger');
  });

  it('should get movies when change select winners option', () => {
    component.filtered = false;
    fixture.detectChanges();
    const select = fixture.nativeElement.querySelector('select');
    select.selectedIndex = 1;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(select.value).withContext('select value true').toEqual('true');
    expect(component.winner).withContext('winner value true').toEqual('true');
    params += `&winner=${component.winner}`;
    expect(spyRequest).withContext('call requestAPI() function').toHaveBeenCalledWith(params);
    expect(spy).withContext('call get API').toHaveBeenCalledWith(httpRequestService.url + params);
  });

});
