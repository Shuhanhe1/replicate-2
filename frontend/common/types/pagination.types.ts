export interface PaginationQuery {
  page: number;
}

export interface Pagination {
  total: number;
  page: number;
  pageSize: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}
