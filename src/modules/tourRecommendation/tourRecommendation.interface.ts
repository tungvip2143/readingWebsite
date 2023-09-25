import { Area } from 'modules/tour/tour.interface';
import { AxiosResponse } from 'axios';
import { PaginationFilters, ResponseCommon } from 'interfaces/common';

export interface TourRecommendation {
  Area: Area;
  id: string | number;
  name: string;
  destination: string;
  description: string;
  thumbnail: string;
  numberOfDays: number;
  numberOfNights: number;
  priceForChildren: number;
  priceForAdult: number;
  currencyUnit: null;
  status: string;
  areaId: number;
  createdAt: string;
  updatedAt: string;
  allowApplyCoupon: boolean;
  allowCancel: boolean;
  allowCancelTime: null;
  createdById: null;
  include: null;
  exclude: null;
  avgRate: null;
  totalRate: null;
  language: string;
  tourGuideCommission: number;
  href: string;
  place: string;
}

export interface TourRecommendationList {
  data: TourRecommendation[];
}
export type ResquestGetListTourRecommendation = PaginationFilters & {
  provinceCode: string;
  recentId: string | number | undefined;
};
export type ResponseGetListTourRecommendation = AxiosResponse<TourRecommendationList>;
