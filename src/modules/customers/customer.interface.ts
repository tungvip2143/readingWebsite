import { AxiosResponse } from 'axios';
import { Gender, UserStatus } from 'constants/common';
import { PaginationFilters, PhoneCode, ResponseCommon } from 'interfaces/common';
import { IUser } from 'modules/login/login.interface';
import { Tour } from 'modules/tour/tour.interface';
import { TourGuide } from 'modules/tourGuide/tourGuide.interface';

export interface TourBookingTransaction {
  id: number;
  status: string;
  tourBookingId: number;
  time: string;
  customerId: string;
  updatedAt: string;
  createdAt: string;
}
export interface TourBooking {
  id: string | number;
  customerId: number | string;
  price: number;
  startTime: string;
  status: string;
  totalAdult: number;
  totalChildren: number;
  tourId: number | string;
  updatedAt: string;
  tourGuideId: null;
  endTime: null;
  discountId: null;
  createdAt: string;
  Tours: Tour;
  TourGuide: TourGuide;
  TourBookingTransaction: TourBookingTransaction;
  Customer: Customer;
  tourSystemCommission: number;
  tourSystemPrice: number;
  totalPrice: number;
}
export interface TourBookingList {
  items: TourBooking[];
  totalItems: number;
  totalPage: number;
  perPage: number;
}

export interface Customer {
  id?: string | number;
  userId?: number | string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
  User?: IUser;
  TourBooking?: TourBooking[];
  cid?: string;
  email?: string;
  firstName?: string;
  gender?: Gender;
  isUpdateProfile?: boolean;
  isVerifyOtp?: boolean;
  lastName?: string;
  password?: string;
  phone?: string;
  phoneCode?: PhoneCode;
  status?: UserStatus;
}
export interface CustomerList {
  items: Customer[];
  currentPage: number;
  totalItems: number;
  totalPage: number;
}
export type RequestGetListCustomer = PaginationFilters & {
  sortField?: string;
  sortOrder?: string;
  fetchAll?: boolean;
  textSearch?: string;
  status?: string;
};
export type RequestGetTourBookingListCustomer = PaginationFilters & {
  sortField?: string;
  sortOrder?: string;
  fetchAll?: boolean;
  textSearch?: string;
};
export type GetTourBookingListCustomerResult = {
  id: number | string;
  body: RequestGetTourBookingListCustomer;
};

export type BodyChangeStatus = {
  status: UserStatus;
};

export type RequestChangeStatus = { id: number | string; body: BodyChangeStatus };
export type ResponseChangeStatus = AxiosResponse<Customer>;

export type RequestGetDetailCustomer = string | number;
export type ResponseGetDetailCustomer = AxiosResponse<ResponseCommon<Customer>>;

export type ResponseGetListCustomer = AxiosResponse<ResponseCommon<CustomerList>>;

export type ResponseGetTourBookingListCustomer = AxiosResponse<ResponseCommon<TourBookingList>>;
