import { Component } from '@angular/core';
import { HttpRequestService } from "../../../../services/http-request/http-request.service";

@Component({
  selector: 'app-top-winners-studios',
  templateUrl: './top-winners-studios.component.html'
})
export class TopWinnersStudiosComponent {
  list: Record<'studios', {name: number; winCount: number}[]> = {studios: []};
  params = '?projection=studios-with-win-count';

  constructor(
    private http: HttpRequestService
  ) {
    this.getStudios();
  }

  /* Get top studios with more wins from the API */
  async getStudios() {
    try {
      const response = await this.http.requestAPI<Record<'studios', { name: number; winCount: number }[]>>(this.params);
      this.list = response || { 'studios': [] };
    } catch (error) {
      console.log(error);
    }
  }
}
