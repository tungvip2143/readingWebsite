import { create } from 'zustand';
import { Area } from 'modules/tour/tour.interface';
import { AxiosResponse } from 'axios';
import {
  GalleryStatus,
  Gender,
  Method,
  Roles,
  TourGuideInfoStatus,
  TypeFile,
} from 'constants/common';
import {
  Gallery,
  Media,
  PaginationFilters,
  PhoneCode,
  ResponseCommon,
  User,
} from 'interfaces/common';
import { Province } from 'modules/province/province.interface';
import { Review } from 'modules/vendor/vendor.interface';

export interface TourGuideDocRequest {
  url?: string;
  content?: string;
  fileType?: TypeFile;
}
export interface TourGuideDoc {
  id: number;
  docLink: string;
  docType: string;
  tourGuideId: number;
  submitFor: null | string;
  submitBy: null | string;
  createdAt: string;
  updatedAt: string;
  media: Media[];
}
export interface TourGuideDocRequestDraft {
  create: {
    docLink: string;
    docType: string;
    media: {
      createMany: {
        data: [{ url: string; content: string; type: Method }];
      };
    };
    status: string;
  };
  deleteMany: {};
}
export type BankAccount = {
  id: number;
  status: GalleryStatus; // Thay đổi kiểu nếu cần
  bankName: string;
  bankCode: string;
  receiveName: string;
  createdAt: string;
  updatedAt: string;
  tourGuideId: number;
};
export type BankAccountDraft = {
  create: { bankName: string; bankCode: string; receiveName: string };
  deleteMany: {};
};
export type MediaItem = {
  url: string;
  content: string;
};
export interface TourGuideArea {
  area: Area;
  areaId: number;
  id: number;
  tourGuideId: number;
}
export interface TourGuideAreaDraft {
  create: [{ areaId: number }];
  deleteMany: {};
}
export interface GalleryDraft {
  create: {
    Media: {
      createMany: {
        data: [{ url: string; content: string; type: Method }];
      };
    };
    status: string;
  };
  deleteMany: {};
}
export interface TourGuideDraft {
  id: number;
  userId: string | null;
  lastName: string;
  firstName: string;
  password: string;
  avatar: string;
  photo: string | null;
  phoneCode: PhoneCode;
  description: string;
  gender: Gender;
  phone: string;
  cid: string | null;
  isUpdateProfile: boolean;
  email: string;
  residenceAccordingToPermanentAddress: string;
  currentResidence: string;
  nameEmergency: string;
  phoneEmergency: string;
  phoneEmergencyCode: string;
  relationShip: string;
  dob: string | null;
  note: string;
  areaId: number;
  destinationId: number | null;
  totalRate: number;
  avgRate: number;
  status: TourGuideInfoStatus;
  isCertificate: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  TourGuideSubscribed: any[];
  TourBooking: any[];
  User: User;
  tourGuidePaymentMethod: BankAccountDraft;
  Gallery: GalleryDraft;
  Area: Province;
  userType?: Roles;
  name?: string;
  thumbnail?: string;
  TourGuideArea: TourGuideAreaDraft;
  TourGuideDoc: TourGuideDocRequestDraft;
}
export interface TourGuide {
  id: number;
  userId: string | null;
  lastName: string;
  firstName: string;
  password: string;
  avatar: string;
  photo: string | null;
  phoneCode: PhoneCode;
  gender: Gender;
  phone: string;
  cid: string | null;
  isUpdateProfile: boolean;
  email: string;
  residenceAccordingToPermanentAddress: string;
  currentResidence: string;
  nameEmergency: string;
  phoneEmergency: string;
  phoneEmergencyCode: string;
  relationShip: string;
  dob: string | null;
  description: string;
  draft: string;
  areaId: number;
  destinationId: number | null;
  totalRate: number;
  avgRate: number;
  status: TourGuideInfoStatus;
  isCertificate: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  TourGuideSubscribed: any[];
  TourBooking: any[];
  User: User;
  tourGuidePaymentMethod: BankAccount[];
  Gallery: Gallery[];
  Area: Province;
  userType?: Roles;
  name?: string;
  thumbnail?: string;
  TourGuideArea: TourGuideArea[];
  TourGuideDoc: TourGuideDoc[];
  note: string;
  Review: Review[];
}
export interface GetListTourGuide extends PaginationFilters {
  sortField?: string;
  sortOrder?: string;
  textSearch?: string;
  status?: TourGuideInfoStatus;
  isActive?: number;
  tourId?: number;
}
export interface TourGuideList {
  items: TourGuide[];
  perPage: number;
  total: number;
  totalPage: number;
  totalItems: number;
}

export type RequestGetListTourGuide = GetListTourGuide;

export type ResponseGetListTourGuide = AxiosResponse<ResponseCommon<TourGuideList>>;

export type RequestGetDetailTourGuide = string | number;
export type ResponseGetDetailTourGuide = AxiosResponse<ResponseCommon<TourGuide>>;

export type RequestCreateTourGuide = {
  firstName?: string;
  lastName?: string;
  cid?: string;
  destination?: string;
  description?: string;
  avatar?: string;
  areaId?: number;
  areas?: number[];
  status?: TourGuideInfoStatus;
  phone?: string;
  gender?: number;
  bankCode?: string;
  bankName?: string;
  paymentMethodStatus?: string;
  media?: MediaItem[];
  tourGuideDocs?: TourGuideDocRequest[];
  receiveName?: string;
  residenceAccordingToPermanentAddress?: string;
  currentResidence?: string;
  nameEmergency?: string;
  phoneEmergency?: string;
  relationship?: string;
  dob?: Date;
  isActive?: boolean;
  isCertificate?: boolean;
  email?: string;
  draft?: Omit<RequestCreateTourGuide, 'draft'>;
  [key: string]:
    | string
    | string[]
    | number
    | boolean
    | Date
    | MediaItem[]
    | undefined
    | null
    | Omit<RequestCreateTourGuide, 'draft'>
    | number[];
};

export type TourGuideCreationResult = {
  response: string;
  status: number;
  message: string;
  name: string;
};
export type ResponseCreateTourGuide = AxiosResponse<ResponseCommon<RequestCreateTourGuide>>;

export type RequestUpdateTourGuide = {
  id: string | number;
  body: RequestCreateTourGuide;
};
export type RequestAcceptDraftTourGuide = {
  id: string | number;
  body: {
    status?: TourGuideInfoStatus;
    note?: string;
  };
};
export type ResponseUpdateTourGuide = AxiosResponse<TourGuide>;

export type RequestDeleteTourGuide = { id: string | number };
export type ResponseDeleteTourGuide = AxiosResponse<{}>;
