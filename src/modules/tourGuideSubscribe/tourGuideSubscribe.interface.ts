import { AxiosResponse } from 'axios';
import { Order, PaginationFilters, ResponseCommon, ResponseList } from 'interfaces/common';
import { TourGuide } from 'modules/tourGuide/tourGuide.interface';

export interface TourGuideSubscribe {
  id?: number;
  tourGuideId?: number;
  tourId?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  TourGuide?: TourGuide;
}

export type RequestGetListTourGuideSubscribe = PaginationFilters & {
  sortField?: string;
  sortOrder?: Order;
  textSearch?: string;
};

export type ResponseGetListTourGuideSubscribe = AxiosResponse<
  ResponseCommon<ResponseList<TourGuideSubscribe[]>>
>;

export type RequestCreateTourGuideSubscribe = {
  tourGuide: number;
};

export type ResponseCreateTourGuideSubscribe = AxiosResponse<
  ResponseCommon<Omit<TourGuideSubscribe, 'TourGuide'>>
>;

export type RequestDeleteTourGuideSubscribe = {
  tourGuideSubscribe: number;
};

export type ResponseDeleteTourGuideSubscribe = AxiosResponse<
  ResponseCommon<Omit<TourGuideSubscribe, 'TourGuide'>>
>;
