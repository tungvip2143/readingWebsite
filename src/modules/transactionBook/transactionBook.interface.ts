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

export interface TransactionBook {
  products: Product[];
  limit: number;
  skip: number;
  total: number;
}

export interface Payment {
  code: string;
  message: string;
  success: boolean;
}

export type RequestGetListTransactionBook = PaginationFilters;
export type ResponseGetListTransactionBook = AxiosResponse<
  ResponseCommon<ResponseList<TransactionBook>>
>;

export type RequestGetDetailTransactionBook = string | number;
export type ResponseGetDetailTransactionBook = AxiosResponse<ResponseCommon<Product>>;

export type RequestCreateUrlPaymentTour = { tourBookingId: string | number; returnUrl: string };
export type ResponseCreateUrlPaymentTour = AxiosResponse<ResponseCommon<string>>;

export type RequestPaymentTour = { tourBookingId: string | number; vnPayParam: string };
export type ResponsePaymentTour = AxiosResponse<ResponseCommon<Payment>>;

export type RequestCreateUrlPaymentVendor = { vendorBookingId: string | number; returnUrl: string };
export type ResponseCreateUrlPaymentVendor = AxiosResponse<ResponseCommon<string>>;

export type RequestPaymentVendor = { vendorBookingId: string | number; vnPayParam: string };
export type ResponsePaymentVendor = AxiosResponse<ResponseCommon<Payment>>;

export type RequestUpdateTransactionBook = { id: string | number; body: Omit<Product, 'id'> };
export type ResponseUpdateTransactionBook = AxiosResponse<Product>;

export type RequestDeleteTransactionBook = { id: string | number };
export type ResponseDeleteTransactionBook = AxiosResponse<{}>;
