import { AxiosResponse } from 'axios';
import { LargeNumberLike } from 'crypto';
import { PaginationFilters } from 'interfaces/common';

export interface Products {
  id: string | number;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  rating: number;
  stock: number;
  discountPercentage: number;
  images: string[];
  thumbnail: string;
}
export interface Book {
  products: Products[];
  limit: number;
  skip: number;
  total: number;
}
export interface RequestGetBookList extends PaginationFilters {
  limit?: number;
}

export type ResponseGetBookList = AxiosResponse<Book>;

export type RequestGetBookListPaging = PaginationFilters;
export type ResponseGetBookListPaging = AxiosResponse<Book>;
