import { AxiosResponse } from 'axios';
import { StatusReservationVendor, StatusReservationVendorPayment } from 'constants/common';
import { PaginationFilters, ResponseCommon, ResponseList } from 'interfaces/common';
import { Customer } from 'modules/customers/customer.interface';
import { Vendor, VendorTypeRelation } from 'modules/vendor/vendor.interface';

export interface ReservationTransaction {
  id: number;
  reservationId: number;
  customerId: number;
  time: string;
  status: StatusReservationVendorPayment;
  createdAt: string;
  updatedAt: string;
}
export interface ReservationVendor {
  id: number;
  vendorId: number;
  customerId: number;
  time: string;
  from: string;
  to: string;
  status: StatusReservationVendor;
  depositAmount: number;
  totalPrice: number;
  totalCustomer: number;
  customerName: string;
  customerPhone: string;
  reservationUniqueId: string;
  createdAt: string;
  updatedAt: string;
  Vendor: Vendor;
  Customer: Customer;
  ReservationTransaction: ReservationTransaction;
  price: number;
  vendorSystemCommission: number;
  vendorSystemPrice: number;
}

export interface ReservationVendorCreate {
  id: number;
  vendorId: number;
  customerId: number;
  time: Date;
  status: string;
  totalPrice: number;
  totalCustomer: number;
  customerName: string;
  customerPhone: string;
  reservationUniqueId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetListReservationVendor extends PaginationFilters {
  sortField?: string;
  sortOrder?: string;
  textSearch?: string;
  status?: StatusReservationVendor;
  time?: Date;
  from?: Date;
  to?: Date;
}
export type RequestGetListReservationVendor = Omit<
  GetListReservationVendor,
  'time' | 'from' | 'to'
> & {
  time?: string;
  from?: string;
  to?: string;
};

export type ResponseGetListReservationVendor = AxiosResponse<
  ResponseCommon<ResponseList<ReservationVendor[]>>
>;

export type RequestGetDetailReservationVendor = string | number;
export type ResponseGetDetailReservationVendor = AxiosResponse<ResponseCommon<ReservationVendor>>;

export type RequestCreateReservationVendor = {
  vendorId: number;
  time: string;
  totalCustomer: number;
};
export type ResponseCreateReservationVendor = AxiosResponse<
  ResponseCommon<ReservationVendorCreate>
>;

export type RequestUpdateReservationVendor = {
  id: string | number;
  body: Omit<ReservationVendor, 'id'>;
};
export type ResponseUpdateReservationVendor = AxiosResponse<ReservationVendor>;

export type RequestDeleteReservationVendor = { id: string | number };
export type ResponseDeleteReservationVendor = AxiosResponse<{}>;

export type RequestConfirmReservationVendor = {
  reservationVendorId: number;
};

export type ResponseConfirmReservationVendor = AxiosResponse<ResponseCommon<boolean>>;

export type ResponseCancelReservationVendor = AxiosResponse<ResponseCommon<ReservationVendor>>;

export type ResponseGetReservationVendorSuccessfulCount = AxiosResponse<ResponseCommon<number>>;
