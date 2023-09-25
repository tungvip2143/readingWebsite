import { AxiosResponse } from 'axios';
import { PaginationFilters } from 'interfaces/common';

export interface VendorRecommendation {
  id: string | number;
  fullName: string;
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
  type: string;
  maxPrice: number;
  minPrice: number;
  name: string;
  VendorTypeRelation: VendorTypeRelation[];
}
export interface VendorTypeRelation {
  id?: number;
  vendorId?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  vendorTypeId?: number;
  type?: VendorType;
}
export interface VendorType {
  createdAt: Date | string;
  id: number;
  name: string;
  updatedAt: Date | string;
}

export interface VendorRecommendationList {
  data: VendorRecommendation[];
}
export type ResquestGetListVendorRecommendation = PaginationFilters & {
  provinceCode: string;
  recentid: string | number | undefined;
};
export type ResponseGetListVendorRecommendation = AxiosResponse<VendorRecommendationList>;
