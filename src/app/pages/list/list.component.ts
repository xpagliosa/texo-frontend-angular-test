import { Component } from '@angular/core';
import { ListItem } from "../../model/movie.model";
import { HttpRequestService } from "../../services/http-request/http-request.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  list: ListItem = { totalPages: 0 };
  page = 0;
  limit = 15;
  winner: boolean | '' = '';
  year = '';
  pages: number[] = [];
  loading = false;
  filtered = false;
  yearError = false;
  currentYear = new Date().getFullYear();
  winnerOptions = [
    { value: '', viewValue: 'Yes / No' },
    { value: true, viewValue: 'Yes' },
    { value: false, viewValue: 'No' }
  ];

  constructor(
    private http: HttpRequestService
  ) {
    // Get movies paginated from the API
    this.getMovies();
  }

  /*
   * Get movies paginated from the API
   * @param page: number
   *  page number
   * @param size: number
   *  number of movies per page
   * @param winner: boolean
   *  filter by winner
   * @param year: number
   *  filter by year
   */
  async getMovies(
    page = this.page,
    size = this.limit,
    winner = this.winner,
    year = this.year
  ) {
    this.loading = true;
    this.list = { totalPages: 0 };
    this.page = page;
    this.winner = winner;
    this.year = year
    this.filtered = !!this.year;

    try {
      let params = `?page=${page}&size=${size}`;
      if (winner) {
        params += `&winner=${winner}`;
      }
      if (year) {
        params += `&year=${year}`;
      }

      // Request the http service with the parameters
      const response = await this.http.requestAPI<ListItem>(params);
      this.list = response || { totalPages: 0 };

      // Create the array of pages to iterate on view
      if (this.list?.totalPages > 1) {
        this.pages = Array.from(Array(this.list.totalPages + 1).keys()).splice(1);
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  /*
   * Function to return only numbers from a string
   */
  onlyNumbers(event: KeyboardEvent) {
    if(
      event.code === 'Backspace' ||
      event.code === 'Delete' ||
      event.key.replace(/[^0-9]/g, '') !== ''
    ) {
      this.yearError = false;
      return;
    }
    return false;
  }

  /*
   * Function to clear the movies filter by year
   */
  async clearYearFilter() {
    this.year = '';
    if (this.filtered) {
      await this.getMovies(0);
    }
  }

  /*
   * Function to check if the year is valid and before the current year
   */
  async checkIsValidYear() {
    if (this.year.length === 4 && Number(this.year) <= this.currentYear) {
      return this.getMovies(0, this.limit, this.winner, this.year);
    }
    this.yearError = true;
  }
}
