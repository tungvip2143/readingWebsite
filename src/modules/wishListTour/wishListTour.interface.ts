import { AxiosResponse } from 'axios';
import { Order, PaginationFilters, ResponseCommon, ResponseList } from 'interfaces/common';
import { Tour } from 'modules/tour/tour.interface';
import { TourGuide } from 'modules/tourGuide/tourGuide.interface';

export interface WishListTour {
  id: number;
  tourId: number;
  customerId: number;
  tourGuideId: number | null;
  createdAt: string;
  updatedAt: string;
  Tour: Tour;
  TourGuide: TourGuide;
  defaultPrice: number;
}
export type RequestGetListWishListTour = PaginationFilters & {
  sortField?: string;
  sortOrder?: Order;
  textSearch?: string;
  tourId?: number;
};

export type ResponseGetListWishListTour = AxiosResponse<
  ResponseCommon<ResponseList<WishListTour[]>>
>;
export type RequestAddWishListTour = {
  tourId: number;
};
export type ResponseAddWishListTour = AxiosResponse<ResponseCommon<WishListTour>>;

export type RequestRemoveWishListTour = {
  tourId: number;
};
export type ResponseRemoveWishListTour = AxiosResponse<ResponseCommon<WishListTour>>;
