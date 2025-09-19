export interface IPagination {
  limit: number;
  page: number;
  order: 'asc' | 'desc';
}