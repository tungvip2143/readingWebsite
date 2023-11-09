import { TourGuide } from 'modules/tourGuide/article.interface';
import { AxiosResponse } from 'axios';
import { StatusMyBookingTour, StatusReservationVendor } from 'constants/common';
import { PaginationFilters, ResponseCommon, ResponseList } from 'interfaces/common';
import { Tour } from 'modules/tour/tour.interface';

export interface CustomerTourBooking {
  id: number;
  lastName: string | null;
  firstName: string;
  phoneCode: string;
  phone: string;
  email: string | null;
  cid: string | null;
  status: string;
  isUpdateProfile: boolean;
  avatar: string | null;
  gender: string;
  isVerifyOtp: boolean;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface MyTourBooking {
  id: number;
  customerId: number;
  tourId: number;
  tourGuideId: number;
  discountId: number;
  price: number;
  totalPrice: number;
  totalAdult: number;
  totalChildren: number;
  startTime: string;
  status: StatusMyBookingTour;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  Customer: CustomerTourBooking;
  Tours: Tour;
  TourGuide: TourGuide;
}

export interface GetListMyTourBooking extends PaginationFilters {
  sortField?: string;
  sortOrder?: string;
  textSearch?: string;
  status?: StatusReservationVendor;
  time?: Date;
  from?: Date;
  to?: Date;
}
export type RequestGetListMyTourBooking = Omit<GetListMyTourBooking, 'time' | 'from' | 'to'> & {
  time?: string;
  from?: string;
  to?: string;
};
export type ResponseGetListMyTourBooking = AxiosResponse<
  ResponseCommon<ResponseList<MyTourBooking[]>>
>;

export type RequestGetDetailMyTourBooking = string | number;
export type ResponseGetDetailMyTourBooking = AxiosResponse<ResponseCommon<MyTourBooking>>;

export type RequestCreateMyTourBooking = { body: Omit<MyTourBooking, 'id'> };
export type ResponseCreateMyTourBooking = AxiosResponse<MyTourBooking>;

export type RequestUpdateMyTourBooking = { id: string | number; body: Omit<MyTourBooking, 'id'> };
export type ResponseUpdateMyTourBooking = AxiosResponse<MyTourBooking>;

export type RequestDeleteMyTourBooking = { id: string | number };
export type ResponseDeleteMyTourBooking = AxiosResponse<{}>;
