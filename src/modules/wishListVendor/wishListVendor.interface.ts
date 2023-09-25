import { AxiosResponse } from 'axios';
import { Order, PaginationFilters, ResponseCommon, ResponseList } from 'interfaces/common';
import { TourGuide } from 'modules/tourGuide/tourGuide.interface';
import { Vendor } from 'modules/vendor/vendor.interface';

export interface WishListVendor {
  id: number;
  customerId: number;
  tourGuideId: number | null;
  vendorId: number;
  createdAt: string;
  updatedAt: string;
  Vendor: Vendor;
  TourGuide: TourGuide;
}

export type RequestGetListWishListVendor = PaginationFilters & {
  sortField?: string;
  sortOrder?: Order;
  textSearch?: string;
  vendorId?: number;
};
export type ResponseGetListWishListVendor = AxiosResponse<
  ResponseCommon<ResponseList<WishListVendor[]>>
>;

export type RequestAddWishListVendor = {
  vendorId: number;
};
export type ResponseAddWishListVendor = AxiosResponse<ResponseCommon<WishListVendor>>;

export type RequestRemoveWishListVendor = {
  vendorId: number;
};
export type ResponseRemoveWishListVendor = AxiosResponse<ResponseCommon<WishListVendor>>;
