import { AxiosResponse } from 'axios';
import { Order, PaginationFilters, ResponseCommon, ResponseList } from 'interfaces/common';
import { Vendor } from 'modules/vendor/vendor.interface';

export interface VendorSubscribe {
  id?: number;
  vendorId?: number;
  tourId?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  vendor?: Vendor;
}

export type RequestGetListVendorSubscribe = PaginationFilters & {
  sortField?: string;
  sortOrder?: Order;
  textSearch?: string;
};

export type ResponseGetListVendorSubscribe = AxiosResponse<
  ResponseCommon<ResponseList<VendorSubscribe[]>>
>;

// export type RequestGetDetailVendorSubscribe = string | number;
// export type ResponseGetDetailVendorSubscribe = AxiosResponse<ResponseCommon<Product>>;

export type RequestCreateVendorSubscribe = {
  vendorId: number;
};

export type ResponseCreateVendorSubscribe = AxiosResponse<
  ResponseCommon<Omit<VendorSubscribe, 'vendor'>>
>;

export type RequestDeleteVendorSubscribe = {
  id: number;
};

export type ResponseDeleteVendorSubscribe = AxiosResponse<
  ResponseCommon<Omit<VendorSubscribe, 'vendor'>>
>;

// export type RequestUpdateVendorSubscribe = { id: string | number; body: Omit<Product, 'id'> };
// export type ResponseUpdateVendorSubscribe = AxiosResponse<Product>;

// export type RequestDeleteVendorSubscribe = { id: string | number };
// export type ResponseDeleteVendorSubscribe = AxiosResponse<{}>;
