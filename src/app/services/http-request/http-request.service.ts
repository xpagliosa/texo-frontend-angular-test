import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  url = "https://tools.texoit.com/backend-java/api/movies";

  constructor(
    private http: HttpClient
  ) { }

  async requestAPI<T>(params: string):Promise<T | undefined> {
    return this.http.get<T>(this.url + params).toPromise();
  }
}
