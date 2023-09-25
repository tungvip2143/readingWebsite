import { TourGuide } from 'modules/tourGuide/tourGuide.interface';
import { AxiosResponse } from 'axios';
import { FilterStatusTourBooking, Gender, TransactionProcess } from 'constants/common';
import {
  Order,
  PaginationFilters,
  ResponseCommon,
  ResponseList,
  StatusTourGuideApplyBooking,
  TourGuideApplyStatus,
} from 'interfaces/common';
import { Tour } from 'modules/tour/tour.interface';

interface TourBookingTransaction {
  status: TransactionProcess;
  time: string;
}
interface Customer {
  id: number;
  lastName: null | string;
  firstName: string;
  phoneCode: string;
  phone: string;
  email: null | string;
  cid: null | string;
  status: string;
  isUpdateProfile: boolean;
  avatar: string;
  gender: Gender;
  isVerifyOtp: boolean;
  password: string;
  createdAt: string;
  updatedAt: string;
}
export interface BookingTour {
  Customer: Customer;
  id: number;
  customerId?: number;
  tourId?: number;
  tourGuideId?: number | null;
  discountId?: number | null;
  price?: number;
  totalAdult?: number | null;
  totalChildren?: number | null;
  startTime?: string;
  status?: string;
  endTime?: string | null;
  createdAt?: string;
  updatedAt?: string;
  Tours: Tour;
  TourGuide: TourGuide;
  TourBookingTransaction: TourBookingTransaction;
  // TourGuideApplyBooking: Pick<TourGuideApplyBooking, 'tourGuideId' | 'tourGuideApplyStatus'>[];
  tourGuideApplyStatus: TourGuideApplyStatus;
  totalPrice?: number;
  tour_booking_transaction_status?: string;
}

export interface TourGuideApplyBooking {
  id: number;
  tourBookingId: number;
  tourGuideId: number;
  tourGuideApplyStatus: StatusTourGuideApplyBooking;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface GetListBookingTour extends PaginationFilters {
  sortField?: string;
  sortOrder?: Order;
  textSearch?: string;
  customerId?: number;
  tourGuideId?: number;
  tab?: FilterStatusTourBooking | string;
  areaId?: number;
  priceFrom?: number;
  priceTo?: number;
  rate?: number;
  attributes?: string;
}

export interface BookingTourList {
  items: BookingTour[];
  currentPage: number;
  totalPage: number;
  perPage: number;
  totalItems: number;
}

export type RequestGetListBookingTour = GetListBookingTour;
export type ResponseGetListBookingTour = AxiosResponse<ResponseCommon<ResponseList<BookingTour[]>>>;

export type RequestGetDetailBookingTour = string | number;
export type ResponseGetDetailBookingTour = AxiosResponse<ResponseCommon<BookingTour>>;

export type BodyRequestCreateBookingTour = {
  totalAdult: number;
  totalChildren: number;
  startTime: string;
};

export type RequestCreateBookingTour = {
  id: number;
  body: BodyRequestCreateBookingTour;
};

export type RequestMatchTourGuide = {
  tourBookingId: number;
  tourGuideId: number;
};

export type MatchTourGuide = {
  id?: number;
  customerId?: number;
  tourId?: number;
  tourGuideId?: number;
  discountId?: null;
  price?: number;
  totalAdult?: number;
  totalChildren?: number;
  startTime?: Date;
  status?: string;
  endTime?: null;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ResponseCreateBookingTour = AxiosResponse<ResponseCommon<BookingTour>>;

export type ResponseMatchTourGuide = AxiosResponse<ResponseCommon<MatchTourGuide>>;

export type RequestUpdateBookingTour = { id: string | number; body: Omit<BookingTour, 'id'> };
export type ResponseUpdateBookingTour = AxiosResponse<BookingTour>;

export type RequestDeleteBookingTour = { id: string | number };
export type ResponseDeleteBookingTour = AxiosResponse<{}>;

export type RequestApplyBookingTour = {
  tourBookingId: number;
};

export type ResponseApplyBookingTour = AxiosResponse<ResponseCommon<TourGuideApplyBooking>>;

export type RequestCancelApplyBooking = {
  tourBookingId: number;
};
