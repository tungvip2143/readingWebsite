import { AxiosResponse } from 'axios';
import { PaginationFilters, ResponseCommon, ResponseList } from 'interfaces/common';

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

export interface Review {
  products: Product[];
  limit: number;
  skip: number;
  total: number;
}

export type RequestCreateReview = {
  for?: string;
  rate?: number;
  content?: string;
};
export type RequestGetListReview = PaginationFilters;
export type ResponseGetListReview = AxiosResponse<ResponseCommon<ResponseList<Review>>>;

export type RequestGetDetailReview = string | number;
export type ResponseGetDetailReview = AxiosResponse<ResponseCommon<Product>>;

// export type RequestCreateReview = { body: Omit<Product, 'id'> };
export type ResponseCreateReview = AxiosResponse<ResponseCommon<{}>>;

export type RequestUpdateReview = { id: string | number; body: Omit<Product, 'id'> };
export type ResponseUpdateReview = AxiosResponse<Product>;

export type RequestDeleteReview = { id: string | number };
export type ResponseDeleteReview = AxiosResponse<{}>;
