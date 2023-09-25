import { AxiosResponse } from 'axios';
import { ResponseCommon } from 'interfaces/common';

export interface Province {
  id: number;
  name: string;
  description: string | null;
  provinceCode: number | string | null;
  full_name: string;
  code: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  area_code: string;
}
export interface Provinces {
  code: string;
  name: string;
  unit: string;
  area_code: string;
  area_name: string;
  full_name: string;
}
export interface District {
  code: string;
  name: string;
  unit: string;
  province_code: string;
  province_name: string;
  area_code: string;
  area_name: string;
  full_name: string;
}

export interface Wards {
  code: string;
  name: string;
  unit: string;
  district_code: string;
  district_name: string;
  province_code: string;
  province_name: string;
  area_code: string;
  area_name: string;
  full_name: string;
}

export type ResponseGetListProvince = AxiosResponse<ResponseCommon<Province[]>>;
export type ResponseGetListProvinceDetail = AxiosResponse<ResponseCommon<Provinces[]>>;
export type ResponseGetListDistrict = AxiosResponse<ResponseCommon<District[]>>;
export type ResponseGetListWards = AxiosResponse<ResponseCommon<Wards[]>>;
