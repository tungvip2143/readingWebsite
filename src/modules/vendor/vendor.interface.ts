import { Customer } from 'modules/customers/customer.interface';
import { AxiosResponse } from 'axios';
import {
  Gallery,
  Media,
  Order,
  PaginationFilters,
  PhoneCode,
  ResponseCommon,
} from 'interfaces/common';
import { VendorSubscribe } from 'modules/vendorSubscribe/vendorSubscribe.interface';
import { Roles } from 'constants/common';

export interface Vendor {
  id?: number;
  userId?: number;
  phone?: string;
  email?: string;
  thumbnail?: string;
  bookingPrice?: number;
  minPrice?: number;
  maxPrice?: number;
  openingTime?: Date | string;
  closingTime?: Date | string;
  openingDay?: string;
  closingDay?: string;
  description?: string;
  destinationId?: number;
  totalRate?: null;
  avgRate?: null;
  isDraft?: boolean;
  isVerify?: boolean;
  status?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  Gallery?: Gallery[];
  User?: User;
  Units?: any[];
  destination?: Destination;
  VendorAttributes?: any[];
  VendorSubscribe?: VendorSubscribe[];
  VendorServing: VendorServing[];
  serveDay: string;
  Review?: Review[];
  totalSlot: number;
  WishListVendor?: boolean;
  name?: string;
  phoneCode: PhoneCode;
  systemPrice: number;
  type: string;
  role?: Roles;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  VendorTypeRelation: VendorTypeRelation[];
}

export interface VendorServing {
  vendorId: number;
  id: number;
  dayOfWeek: string;
  start: string;
  end: string;
}

export interface VendorTypeRelation {
  id?: number;
  vendorId?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  vendorTypeId?: number;
  type?: VendorType;
}
export interface VendorType {
  createdAt: Date | string;
  id: number;
  name: string;
  updatedAt: Date | string;
}

export interface User {
  id?: number;
  username?: string;
  password?: string;
  fullName?: string;
  lastName?: null;
  firstName?: null;
  phoneCode?: string;
  phone?: string;
  email?: null;
  cid?: null;
  isUpdateProfile?: boolean;
  avatar?: string | null;
  gender?: string;
  isVerifyOtp?: boolean;
  lastAccessToken?: null;
  refreshToken?: null;
  role?: string;
  userStatus?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
export interface Review {
  id: number;
  customerId: number;
  tourId: null;
  vendorId: number;
  tourGuideId: null;
  status: null;
  rate: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  Customer: Customer;
}
export interface ListVendor {
  items: Vendor[];
  totalItems: number;
  currentPage: number;
  totalPage: number;
  perPage: number;
}

export interface Destination {
  id?: number;
  latitude?: null;
  longitude?: null;
  fullAddress?: string;
  provinceName?: string;
  districtName?: string;
  wardName?: string;
  provinceCode?: string;
  districtCode?: string;
  wardCode?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface ListVendor {
  items: Vendor[];
  totalItems: number;
  currentPage: number;
  totalPage: number;
  perPage: number;
}

export type RequestGetListVendor = PaginationFilters & {
  sortField?: string;
  sortOrder?: Order;
  textSearch?: string;
  type?: string;
  provinceCode?: string;
  tourId?: number;
  rating?: number;
  maxPrice?: number;
  minPrice?: number;
};
export interface Serving {
  start: string;
  end: string;
}

export interface RequestServing {
  [dayOfWeek: string]: Serving[];
}

export type ResponseGetListVendor = AxiosResponse<ResponseCommon<ListVendor>>;

export type RequestGetDetailVendor = string | number;
export type ResponseGetDetailVendor = AxiosResponse<ResponseCommon<Vendor>>;

export type RequestCreateVendor = {
  email?: string;
  name?: string;
  phone?: string;
  description?: string;
  provinceCode?: string;
  phoneCode?: string;
  districtCode?: string;
  wardCode?: string;
  fullAddress?: string;
  status?: string;
  vendorTypes?: number[];
  media?: Media[];
  bookingPrice?: number;
  totalSlot?: number;
  minPrice?: number;
  maxPrice?: number;
  startServeTime?: string;
  startServeDay?: string;
  endServeTime?: string;
  endServeDay?: string;
  isVerify?: boolean;
  servings: RequestServing;
  [key: string]: string | Media[] | number | boolean | number[] | undefined | RequestServing;
};
export type ResponseCreateVendor = AxiosResponse<ResponseCommon<RequestCreateVendor>>;

export type RequestUpdateVendor = { id: string | number; body: RequestCreateVendor };
export type ResponseUpdateVendor = AxiosResponse<Vendor>;

export type RequestDeleteVendor = { id: string | number };
export type ResponseDeleteVendor = AxiosResponse<{}>;
