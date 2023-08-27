export interface PaginatedResponseData<T> {
    status: number | string;
    message: string;
    meta: MetaData;
    data: T | T[];
  }
  
  interface MetaData {
    total_items: number;
    total_pages: number;
    current_page: number;
  }
  export interface CalcPaginationType {
    limit: number;
    offset: number;
  }
  
  export interface ResultSetMeta {
    limit: number;
    offset: number;
    page: number;
  }
  
  export interface PaginationData<T> {
    total_items: number;
    data_response?: T | T[];
    total_pages: number;
    current_page: number;
  }