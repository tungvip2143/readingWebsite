import { AxiosResponse } from 'axios';
import {
  Media,
  Order,
  PaginationFilters,
  ResponseCommon,
  ResponseList,
  SelectOption,
  User,
} from 'interfaces/common';
import { Language, TourStatus } from 'constants/common';
import { TourCategory } from 'modules/tour-category/tour-category.interface';
import { Customer } from 'modules/customers/customer.interface';
import { TourGuide } from 'modules/tourGuide/tourGuide.interface';

export interface Attributes {
  id: number;
  name: string;
  type: string;
}
export interface Area {
  areaCode: string;
  areaName: string;
  code: number;
  createAt: string;
  description: string;
  id: number;
  name: string;
  provinceCode: string | null;
  updateAt: string;
}
export interface Tour {
  id: number;
  name?: string;
  description?: string;
  thumbnail?: string;
  numberOfDays?: number;
  numberOfNights?: number;
  priceForChildren?: number | null;
  priceForAdult?: number | null;
  defaultNumberCustomer?: number | null;
  defaultPrice?: number | null;
  status?: TourStatus;
  areaId?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  allowApplyCoupon?: boolean;
  allowCancel?: boolean;
  createdById?: string | null;
  include?: string[] | null;
  exclude?: string[] | null;
  language?: Language[];
  Gallery?: Gallery[];
  categories?: Category[];
  avgRate?: number | null;
  totalRate?: number | null;
  allowCancelTime?: number;
  Area?: Area;
  schedules?: Schedules[];
  Review?: TourReview[];
  WishListTour?: boolean;
  adminCreatedBy?: User;
  TourAttributes?: Attributes[];
  createdBy?: TourGuide;
  maxCustomer?: number;
  minCustomer?: number;
  fixCost?: number;
}

export interface TourReview {
  content?: string;
  updatedAt?: string;
  rate?: number;
  Customer: Customer;
  id?: number | string;
}

export interface Schedules {
  title?: string;
  description?: string;
}
export interface Gallery {
  id?: number;
  tourId?: number;
  description?: string | null;
  status?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  vendorId?: null;
  Media?: Media[];
}

// export interface Media {
//   id?: number;
//   url?: string;
//   type?: string;
//   content?: string;
//   createdAt?: Date | string;
//   updatedAt?: Date | string;
//   galleryId?: number;
// }

export interface Category {
  id?: number;
  tourId?: number;
  categoryId?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  category?: TourCategory;
}

export type RequestGetListTour = PaginationFilters & {
  sortField?: string;
  sortOrder?: Order;
  textSearch?: string;
  categories?: string[];
  provinceCode?: string;
  rate?: number;
  attributes?: string[];
  priceForm?: number;
  priceTo?: number;
  status?: TourStatus | string;
};
export interface SearchProvine {
  label: string;
  value: string;
}

export type IGetListTour = PaginationFilters & {
  sortField?: string;
  sortOrder?: Order;
  textSearch?: string;
  categories?: string;
  areas?: number;
  attributes?: string;
  priceForm?: number;
  priceTo?: number;
  rating?: number;
  status?: TourStatus | string;
  provinceCode?: string;
};
export type ResponseGetListTour = AxiosResponse<ResponseCommon<ResponseList<Tour[]>>>;

export type RequestCreateTour = {
  name?: string;
  language?: SelectOption[];
  description?: string;
  include?: string[] | null;
  exclude?: string[] | null;
  media?: Media[];
  areaId?: string | number;
  duration?: string | any;
  schedule?: string;
  priceForAdult?: number | null;
  priceForChildren?: number | null;
  allowApplyCoupon?: boolean;
  allowCancel?: boolean;
  time?: Date | string;
  categories?: Category[] | number[];
  tourGuides?: number[];
  commission?: number | string;
  destination?: string;
  thumbnail?: string;
  status?: TourStatus;
};

export type ResponseCreateTour = {};

export type RequestEditTour = {
  id: number;
  body: RequestCreateTour;
};

export type ResponseEditTour = {};

export type RequestDetailTour = {
  id: number;
};

export type ResponseDetailTour = AxiosResponse<ResponseCommon<Tour>>;

export type RequestDeleteTour = {
  id: number;
};

export type ResponseDeleteTour = AxiosResponse<ResponseCommon<Tour>>;
