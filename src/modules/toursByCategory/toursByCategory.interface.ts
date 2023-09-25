import { ResponseList } from './../../interfaces/common';
import { AxiosResponse } from 'axios';
import { PaginationFilters, ResponseCommon } from 'interfaces/common';
import { Area, Tour } from 'modules/tour/tour.interface';

export interface ToursByCategory {
  id?: number;
  name: string;
  description?: string;
  thumbnail?: string;
  areaId: number;
  createdAt: string;
  updatedAt: string;
  category?: CategoryOfTourByCategory;
  tours: Tour[];
}

export interface CategoryOfTourByCategory {
  id: number | string;
  name: string;
  description: string;
  thumbnail: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type RequestGetListToursByCategory = PaginationFilters & {
  provinceCode?: string;
  categories?: string;
  minPrice?: number;
  maxPrice?: number;
  attributes?: string;
  rating?: number;
  textSearch?: string;
};
export type ResponseGetListToursByCategory = AxiosResponse<
  ResponseCommon<ResponseList<ToursByCategory>>
>;
