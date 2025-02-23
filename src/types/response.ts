export interface BaseResponse<T> {
  success: boolean;
  message?: string;
  data: T | null;
  error?: unknown;
}

export interface PaginationResponse<T> extends BaseResponse<T[]> {
  totalPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  currentPage: number;
}
