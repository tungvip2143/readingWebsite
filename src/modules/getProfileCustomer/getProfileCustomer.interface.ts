import { ReservationVendor } from 'modules/reservationVendor/reservationVendor.interface';
import { WishListVendor } from './../wishListVendor/wishListVendor.interface';
import { AxiosResponse } from 'axios';
import { GalleryStatus, Gender } from 'constants/common';
import { PaginationFilters, ResponseCommon } from 'interfaces/common';
import { TourBooking } from 'modules/customers/customer.interface';
import { WishListTour } from 'modules/wishListTour/wishListTour.interface';

export interface GetProfile {
  id: number;
  userId: string | null;
  lastName: string;
  firstName: string;
  phoneCode: string;
  phone: string;
  email: string | null;
  cid: string | null;
  status: GalleryStatus;
  isUpdateProfile: boolean;
  avatar: string | null;
  gender: Gender;
  isVerifyOtp: boolean;
  password: string;
  createdAt: string;
  updatedAt: string;
  TourBooking: TourBooking[];
  WishListTour: WishListTour[];
  WishListVendor: WishListVendor[];
  ReservationVendor: ReservationVendor[];
}

export type RequestGetListGetProfileCustomer = PaginationFilters;
export type ResponseGetListGetProfileCustomer = AxiosResponse<ResponseCommon<GetProfile>>;
