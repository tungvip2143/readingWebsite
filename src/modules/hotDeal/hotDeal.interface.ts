import { AxiosResponse } from 'axios';
import { BannerStatus, BannerType } from 'constants/common';
import { Order, PaginationFilters, ResponseCommon, ResponseList } from 'interfaces/common';

export interface HotDeal {
  id: number;
  name: string;
  bannerId: string;
  type: BannerType;
  status: BannerStatus;
  description: string;
  bannerUrl: string;
  deepLinkApp: string;
  webLink: string;
  from: string;
  to: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export type RequestGetListHotDeal = PaginationFilters & {
  sortField?: string;
  sortOrder?: Order;
  textSearch?: string;
  status?: BannerStatus;
  type?: BannerType;
  from?: string;
  to?: string;
};
export type ResponseGetListHotDeal = AxiosResponse<ResponseCommon<ResponseList<HotDeal[]>>>;

export type RequestGetDetailHotDeal = string | number;
export type ResponseGetDetailHotDeal = AxiosResponse<ResponseCommon<HotDeal>>;

export type RequestCreateHotDeal = {
  name?: string;
  bannerUrl?: string;
  description?: string;
  status?: BannerStatus;
  type?: BannerType;
  webLink?: string;
  deepLinkApp?: string;
  bannerId?: string;
  from?: string;
  to?: string;
  [key: string]: string | BannerType | undefined;
};
export type ResponseCreateHotDeal = AxiosResponse<ResponseCommon<HotDeal>>;

export type RequestUpdateHotDeal = { id: string | number; body: RequestCreateHotDeal };
export type ResponseUpdateHotDeal = AxiosResponse<HotDeal>;

export type RequestDeleteHotDeal = { id: string | number };
export type ResponseDeleteHotDeal = AxiosResponse<{}>;
