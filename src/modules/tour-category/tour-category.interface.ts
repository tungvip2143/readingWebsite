import { AxiosResponse } from 'axios';
import { ResponseCommon } from 'interfaces/common';

export interface TourCategory {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  areaId: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  count: number;
  _count?: TourCategoryRelation;
  bookingSuccess: number;
}

export interface TotalBookingSuccess {
  categories:         TourCategory[];
  tourBookingSuccess: number;
}

export interface TourCategoryRelation {
  TourCategoryRelation: number;
}

export type ResponseGetListTourCategory = AxiosResponse<ResponseCommon<TourCategory[]>>;

export type ResponseGetListTotalBookingSuccess = AxiosResponse<ResponseCommon<TotalBookingSuccess>>;
