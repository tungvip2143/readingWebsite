import { AxiosResponse } from 'axios';
import { PaginationFilters } from 'interfaces/common';

export interface Product {
  id: string | number;
  title?: string;
  description?: string;
  price?: number;
  brand?: string;
  category?: string;
  rating?: number;
  stock?: number;
  discountPercentage?: number;
  images: string[];
}

export interface Service {
  products: Product[];
  limit: number;
  skip: number;
  total: number;
}
``;

export type RequestGetListService = PaginationFilters;
export type ResponseGetListService = AxiosResponse<Service>;

export type RequestGetDetailService = string | number;
export type ResponseGetDetailService = AxiosResponse<Product>;

export type RequestCreateService = { body: Omit<Product, 'id'> };
export type ResponseCreateService = AxiosResponse<Product>;

export type RequestUpdateService = { id: string | number; body: Omit<Product, 'id'> };
export type ResponseUpdateService = AxiosResponse<Product>;

export type RequestDeleteService = { id: string | number };
export type ResponseDeleteService = AxiosResponse<{}>;
