import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { HttpRequestService } from "../../services/http-request/http-request.service";
import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

fdescribe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let httpRequestService: HttpRequestService;
  let http: HttpClient;

  // const initialList = {
  //   "content": [
  //     {
  //       "id": 1,
  //       "year": 1980,
  //       "title": "Can't Stop the Music",
  //       "studios": [
  //         "Associated Film Distribution"
  //       ],
  //       "producers": [
  //         "Allan Carr"
  //       ],
  //       "winner": true
  //     },
  //     {
  //       "id": 2,
  //       "year": 1980,
  //       "title": "Cruising",
  //       "studios": [
  //         "Lorimar Productions",
  //         "United Artists"
  //       ],
  //       "producers": [
  //         "Jerry Weintraub"
  //       ],
  //       "winner": false
  //     },
  //     {
  //       "id": 3,
  //       "year": 1980,
  //       "title": "The Formula",
  //       "studios": [
  //         "MGM",
  //         "United Artists"
  //       ],
  //       "producers": [
  //         "Steve Shagan"
  //       ],
  //       "winner": false
  //     },
  //     {
  //       "id": 4,
  //       "year": 1980,
  //       "title": "Friday the 13th",
  //       "studios": [
  //         "Paramount Pictures"
  //       ],
  //       "producers": [
  //         "Sean S. Cunningham"
  //       ],
  //       "winner": false
  //     },
  //     {
  //       "id": 5,
  //       "year": 1980,
  //       "title": "The Nude Bomb",
  //       "studios": [
  //         "Universal Studios"
  //       ],
  //       "producers": [
  //         "Jennings Lang"
  //       ],
  //       "winner": false
  //     },
  //     {
  //       "id": 6,
  //       "year": 1980,
  //       "title": "The Jazz Singer",
  //       "studios": [
  //         "Associated Film Distribution"
  //       ],
  //       "producers": [
  //         "Jerry Leider"
  //       ],
  //       "winner": false
  //     },
  //     {
  //       "id": 7,
  //       "year": 1980,
  //       "title": "Raise the Titanic",
  //       "studios": [
  //         "Associated Film Distribution"
  //       ],
  //       "producers": [
  //         "William Frye"
  //       ],
  //       "winner": false
  //     },
  //     {
  //       "id": 8,
  //       "year": 1980,
  //       "title": "Saturn 3",
  //       "studios": [
  //         "Associated Film Distribution"
  //       ],
  //       "producers": [
  //         "Stanley Donen"
  //       ],
  //       "winner": false
  //     },
  //     {
  //       "id": 9,
  //       "year": 1980,
  //       "title": "Windows",
  //       "studios": [
  //         "United Artists"
  //       ],
  //       "producers": [
  //         "Mike Lobell"
  //       ],
  //       "winner": false
  //     },
  //     {
  //       "id": 10,
  //       "year": 1980,
  //       "title": "Xanadu",
  //       "studios": [
  //         "Universal Studios"
  //       ],
  //       "producers": [
  //         "Lawrence Gordon"
  //       ],
  //       "winner": false
  //     },
  //     {
  //       "id": 11,
  //       "year": 1981,
  //       "title": "Mommie Dearest",
  //       "studios": [
  //         "Paramount Pictures"
  //       ],
  //       "producers": [
  //         "Frank Yablans"
  //       ],
  //       "winner": true
  //     },
  //     {
  //       "id": 12,
  //       "year": 1981,
  //       "title": "Endless Love",
  //       "studios": [
  //         "PolyGram",
  //         "Universal Studios"
  //       ],
  //       "producers": [
  //         "Dyson Lovell"
  //       ],
  //       "winner": false
  //     },
  //     {
  //       "id": 13,
  //       "year": 1981,
  //       "title": "Heaven's Gate",
  //       "studios": [
  //         "United Artists"
  //       ],
  //       "producers": [
  //         "Joann Carelli"
  //       ],
  //       "winner": false
  //     },
  //     {
  //       "id": 14,
  //       "year": 1981,
  //       "title": "The Legend of the Lone Ranger",
  //       "studios": [
  //         "Associated Film Distribution",
  //         "Universal Studios"
  //       ],
  //       "producers": [
  //         "Walter Coblenz"
  //       ],
  //       "winner": false
  //     },
  //     {
  //       "id": 15,
  //       "year": 1981,
  //       "title": "Tarzan, the Ape Man",
  //       "studios": [
  //         "MGM",
  //         "United Artists"
  //       ],
  //       "producers": [
  //         "John Derek"
  //       ],
  //       "winner": false
  //     }
  //   ],
  //   "pageable": {
  //     "sort": {
  //       "sorted": false,
  //       "unsorted": true,
  //       "empty": true
  //     },
  //     "offset": 0,
  //     "pageSize": 15,
  //     "pageNumber": 0,
  //     "paged": true,
  //     "unpaged": false
  //   },
  //   "totalPages": 14,
  //   "totalElements": 206,
  //   "last": false,
  //   "size": 15,
  //   "number": 0,
  //   "sort": {
  //     "sorted": false,
  //     "unsorted": true,
  //     "empty": true
  //   },
  //   "first": true,
  //   "numberOfElements": 15,
  //   "empty": false
  // };

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
    fixture.detectChanges();
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
    component.loading = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.card-item')).toBeTruthy();
  });

  it('should have a card title', () => {
    component.loading = false;
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.card-title');
    expect(element.textContent).toEqual(' List movies ');
  });

  it('should have a table', () => {
    component.loading = false;
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.table');
    expect(element).toBeTruthy();
  });

  it('should have a table header with 4 columns and specific titles', () => {
    component.loading = false;
    fixture.detectChanges();

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
    component.loading = false;
    fixture.detectChanges();
    const btnClear = fixture.debugElement.query(By.css('#btn-clear'));
    expect(btnClear).toBeFalsy();
    const enterText = fixture.debugElement.query(By.css('#enter-text'));
    expect(enterText).toBeFalsy();
  });

  it('should show clear button and enter text when input is not empty', () => {
    component.year = '2021';
    component.loading = false;
    fixture.detectChanges();
    const btnClear = fixture.debugElement.query(By.css('#btn-clear'));
    expect(btnClear).toBeTruthy();
    const enterText = fixture.debugElement.query(By.css('#enter-text'));
    expect(enterText).toBeTruthy();
  });

  it('should clear input when button is clicked and list is not filtered by year', () => {
    component.year = '2021';
    component.filtered = false;
    component.loading = false;
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
    component.loading = false;
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    const spyRequest = spyOn(httpRequestService, 'requestAPI').and.callThrough();
    const spy = spyOn(http, 'get').and.callThrough();
    const btnClear = fixture.debugElement.query(By.css('#btn-clear'));
    btnClear.triggerEventHandler('click', null);
    expect(input.value).withContext('input cleared').toEqual('');
    expect(component.year).withContext('year var cleared').toEqual('');
    const params = `?page=0&size=15`;
    expect(spyRequest).withContext('call requestAPI() function').toHaveBeenCalledWith(params);
    expect(spy).toHaveBeenCalledWith(httpRequestService.url + params);
  });

  it('should get movies from API without filters', () => {
    const spyRequest = spyOn(httpRequestService, 'requestAPI').and.callThrough();
    const spy = spyOn(http, 'get').and.callThrough();
    component.loading = false;
    fixture.detectChanges();
    component.getMovies();
    const params = `?page=${component.page}&size=${component.limit}`;
    expect(spyRequest).withContext('call requestAPI() function').toHaveBeenCalledWith(params);
    expect(spy).withContext('call get API').toHaveBeenCalledWith(httpRequestService.url + params);
  });

  it('should get movies from API with Year filter', () => {
    const spyRequest = spyOn(httpRequestService, 'requestAPI').and.callThrough();
    const spy = spyOn(http, 'get').and.callThrough();
    component.loading = false;
    component.year = '1980';
    fixture.detectChanges();
    component.getMovies();
    const params = `?page=${component.page}&size=${component.limit}&year=${component.year}`;
    expect(spyRequest).withContext('call requestAPI() function').toHaveBeenCalledWith(params);
    expect(spy).withContext('call get API').toHaveBeenCalledWith(httpRequestService.url + params);
  });

  it('should get movies from API with Winner filter', () => {
    const spyRequest = spyOn(httpRequestService, 'requestAPI').and.callThrough();
    const spy = spyOn(http, 'get').and.callThrough();
    component.loading = false;
    component.winner = true;
    fixture.detectChanges();
    component.getMovies();
    const params = `?page=${component.page}&size=${component.limit}&winner=${component.winner}`;
    expect(spyRequest).withContext('call requestAPI() function').toHaveBeenCalledWith(params);
    expect(spy).withContext('call get API').toHaveBeenCalledWith(httpRequestService.url + params);
  });

  it('should get movies from API with Year and Winner filter', () => {
    const spyRequest = spyOn(httpRequestService, 'requestAPI').and.callThrough();
    const spy = spyOn(http, 'get').and.callThrough();
    component.loading = false;
    component.year = '1980';
    component.winner = true;
    fixture.detectChanges();
    component.getMovies();
    const params = `?page=${component.page}&size=${component.limit}&winner=${component.winner}&year=${component.year}`;
    expect(spyRequest).withContext('call requestAPI() function').toHaveBeenCalledWith(params);
    expect(spy).withContext('call get API').toHaveBeenCalledWith(httpRequestService.url + params);
  });

  it('should get movies from API with pagination', () => {
    const spyRequest = spyOn(httpRequestService, 'requestAPI').and.callThrough();
    const spy = spyOn(http, 'get').and.callThrough();
    component.loading = false;
    component.page = 5;
    fixture.detectChanges();
    component.getMovies();
    const params = `?page=${component.page}&size=${component.limit}`;
    expect(spyRequest).withContext('call requestAPI() function').toHaveBeenCalledWith(params);
    expect(spy).withContext('call get API').toHaveBeenCalledWith(httpRequestService.url + params);
  });

});
