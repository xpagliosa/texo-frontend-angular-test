import { Component } from '@angular/core';
import { HttpRequestService } from "../../../../services/http-request/http-request.service";
import { Movie } from "../../../list/list.model";

@Component({
  selector: 'app-winners-by-year',
  templateUrl: './winners-by-year.component.html'
})
export class WinnersByYearComponent {
  list: Movie[] = [];

  year = '';
  filtered = false;
  yearError = false;
  currentYear = new Date().getFullYear();
  loading = false;
  searched = false;

  constructor(
    private http: HttpRequestService
  ) {
  }



  /*
   * Get winner movies by year from the API
   * @param year: number
   */
  async getWinnerMoviesByYear(
    year = this.year
  ) {
    this.loading = true;
    this.searched = false;
    this.list = [];
    this.year = year

    try {
      const params = `?winner=true&year=${year}`;

      const response = await this.http.requestAPI<Movie[]>(params);
      this.list = response || [];
      this.searched = true;
    } catch (error) {
      console.log(error);
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
    this.list = [];
    this.searched = false;
  }

  /*
   * Function to check if the year is valid and before the current year
   */
  async checkIsValidYear() {
    if (this.year.length === 4 && Number(this.year) <= this.currentYear) {
      return this.getWinnerMoviesByYear(this.year);
    }
    this.yearError = true;
  }
}
