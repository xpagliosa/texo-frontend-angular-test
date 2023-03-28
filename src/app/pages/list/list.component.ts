import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  page = 1;
  skip = 0;
  limit = 15;
  list = {
    total: 50,
    data: []
  }
  pages: number[] = [];
  totalPages: number;

  constructor() {
    this.totalPages = Math.floor(this.list.total / this.limit);
    this.pages = Array.from(Array(this.totalPages + 1).keys()).splice(1);
    console.log(this.pages);
  }

  gotoPage(pageNumber: number) {
    console.log(pageNumber);
    this.page = pageNumber;
  }
}
