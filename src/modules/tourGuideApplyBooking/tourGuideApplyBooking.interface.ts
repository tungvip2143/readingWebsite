import { AxiosResponse } from 'axios';
import { PaginationFilters, ResponseCommon, ResponseList } from 'interfaces/common';
import { TourGuide } from 'modules/tourGuide/tourGuide.interface';

export interface Guide {
  id: string | number;
  tourBookingId?: number;
  tourGuideApplyStatus?: string;
  tourGuideId?: number;
  updatedAt?: string;
  TourGuide: TourGuide;
}

export type RequestGetListTourGuideApplyBooking = PaginationFilters & {
  tourBookingId?: number;
};
export type ResponseGetListTourGuideApplyBooking = AxiosResponse<
  ResponseCommon<ResponseList<Guide[]>>
>;

export type RequestGetDetailTourGuideApplyBooking = string | number;
export type ResponseGetDetailTourGuideApplyBooking = AxiosResponse<ResponseCommon<Guide>>;

export type RequestCreateTourGuideApplyBooking = { body: Omit<Guide, 'id'> };
export type ResponseCreateTourGuideApplyBooking = AxiosResponse<Guide>;

export type RequestUpdateTourGuideApplyBooking = { id: string | number; body: Omit<Guide, 'id'> };
export type ResponseUpdateTourGuideApplyBooking = AxiosResponse<Guide>;

export type RequestDeleteTourGuideApplyBooking = { id: string | number };
export type ResponseDeleteTourGuideApplyBooking = AxiosResponse<{}>;
