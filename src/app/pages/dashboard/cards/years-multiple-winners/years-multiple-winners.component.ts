import { Component } from '@angular/core';
import { HttpRequestService } from "../../../../services/http-request/http-request.service";

@Component({
  selector: 'app-years-multiple-winners',
  templateUrl: './years-multiple-winners.component.html'
})
export class YearsMultipleWinnersComponent {
  list: Record<'years', {year: number; winnerCount: number}[]> = {years: []};
  params = '?projection=years-with-multiple-winners';

  constructor(
    private http: HttpRequestService
  ) {
    this.getWinners()
  }

  /* Get winner movies by year from the API */
  async getWinners() {
    try {
      const response = await this.http.requestAPI<Record<'years', {year: number; winnerCount: number}[]>>(this.params);
      this.list = response || {'years': []};
    } catch (error) {
      console.error(error);
    }
  }
}
