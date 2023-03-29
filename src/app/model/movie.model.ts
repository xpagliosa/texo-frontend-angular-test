export interface Movie {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

export interface Producer {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface Pageable {
  sort: Sort;
  offset: number;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
}

export interface ListItem {
  content?: Movie[];
  pageable?: Pageable;
  totalPages: number;
  totalElements?: number;
  last?: boolean;
  size?: number;
  number?: number;
  sort?: Sort;
  first?: boolean;
  numberOfElements?: number;
  empty?: boolean;
}
