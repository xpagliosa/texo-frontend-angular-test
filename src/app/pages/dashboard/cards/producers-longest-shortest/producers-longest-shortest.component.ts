import { Component } from '@angular/core';
import { HttpRequestService } from "../../../../services/http-request/http-request.service";

export interface Producer {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}
@Component({
  selector: 'app-producers-longest-shortest',
  templateUrl: './producers-longest-shortest.component.html'
})
export class ProducersLongestShortestComponent {
  list: Record<'min' | 'max', Producer[]> = {min: [], max: []};
  params = '?projection=max-min-win-interval-for-producers';

  constructor(
    private http: HttpRequestService
  ) {
    this.getProducers();
  }

  async getProducers() {
    try {
      const response = await this.http.requestAPI<Record<'min' | 'max', Producer[]>>(this.params);
      this.list = response || { 'min': [], max: [] };
    } catch (error) {
      console.log(error);
    }
  }
}
