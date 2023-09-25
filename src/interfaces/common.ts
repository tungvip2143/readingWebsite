import { StaticImageData } from 'next/image';
import { GalleryStatus, Gender, UserType, TypeFile } from 'constants/common';
export interface PaginationFilters {
  page?: number;
  perPage?: number;
}

export interface SelectOption {
  label: string;
  value: any;
}
export interface Tablist {
  isActive: boolean;
  label: string;
  onClick: () => void;
}

export interface ResponseCommon<T> {
  data: T;
  message: string;
  statusCode?: number;
  success: boolean;
}

export interface ResponseList<T> {
  currentPage: number;
  items: T;
  perPage: number;
  totalItems: number;
  totalPage: number;
}

export enum Order {
  desc = 'desc',
  asc = 'asc',
}
export type OrderType = Order.desc | Order.asc;

export type SetOptionsValue = React.Dispatch<React.SetStateAction<SelectOption[]>>;
export type SetBooleanState = React.Dispatch<React.SetStateAction<boolean>>;

export interface RouterBaseChild {
  label: string;
  path: string;
  icon: React.ReactNode;
}
export interface RouterBase {
  label: string;
  path: string;
  icon: React.ReactNode;
  children?: RouterBaseChild[];
  showTab: boolean;
}

export interface Media {
  id?: number;
  url?: string | File;
  type?: TypeFile;
  createdAt?: string;
  updatedAt?: string;
  galleryId?: number;
  content?: string;
  order?: number;
}

export interface Gallery {
  Media: Media[];
  id: number;
  tourId: number | null;
  description: string | null;
  status: GalleryStatus;
  createdAt: string;
  updatedAt: string;
  vendorId: number | null;
  tourGuideId: number;
}
export interface TourOfCategory {
  id: number;
  image: string;
  name: string;
  place: string;
  price: number;
  rating: number;
  href: string;
}
export interface ListOfCategory {
  label: string;
  category: string;
  allNumber: number;
  data: TourOfCategory[];
}

export interface ScheduleOfDetailTour {
  title: string;
  subTitle: string;
}

export interface ReviewOfDetailTour {
  id?: number;
  name: string;
  star: number;
  imageUrl: string;
  description: string;
  date: string;
}
export interface DetailOfTour {
  id: string;
  title: string;
  category: string[];
  location: string;
  rating: number;
  reviewNumber: number;
  price: number;
  language: string[];
  description: string;
  schedule: ScheduleOfDetailTour[];
  service: string[];
  notService: string[];
  review: ReviewOfDetailTour[];
}

export interface Places {
  id: string;
  image: StaticImageData | string;
  name: string;
  tag: string[];
  price: number;
  rating: number;
  href: string;
}
export interface PlacesInformation {
  numberBooking: number;
  total: number;
  data: Places[];
}

export interface ReviewOfDetailPlaces {
  id?: number;
  name: string;
  star: number;
  imageUrl: string;
  description: string;
}
export interface DetailOfPlaces {
  id: string;
  thumbnail: string;
  title: string;
  category: string[];
  location: string;
  opening: Boolean;
  rating: number;
  reviewNumber: number;
  price: number;
  description: string;
  timeOpen: string[];
  dayOpen: string[];
  locationFrame: string;
  locationTitle: string;
  imageList: string[];
  review: ReviewOfDetailPlaces[];
}

export interface BreadcrumbsDetail {
  label: string;
  href: string;
}

export enum TypeOfFilterHeader {
  dialog = 'dialog',
}

export interface User {
  id: number;
  username: string;
  password: string;
  fullName: string;
  lastName: string | null;
  firstName: string | null;
  phone: string;
  email: string;
  cid: string | null;
  avatar: string;
  gender: Gender;
  isVerifyOtp: boolean;
  isUpdateProfile: boolean;
  lastAccessToken: string | null;
  refreshToken: string | null;
  userType: UserType;
  userStatus: GalleryStatus;
  createdAt: string;
  updatedAt: string;
  phoneEmergencyCode?: string;
  phoneCode?: string;
}

export interface Destination {
  id: string | number;
  latitude: null;
  longitude: null;
  fullAddress: string;
  provinceName: string;
  districtName: string;
  wardName: string;
  provinceCode: string;
  districtCode: string;
  wardCode: string;
}

export interface RatingData {
  value: number;
  star: number;
}

export interface DetailCategory {
  label: string;
  numberBooking: number;
  backgroundImage: string;
}

export enum StatusTourGuideApplyBooking {
  NEW = 'NEW', // tour trạng thái new - apply(nhưng không phải tour guide này đăng ký)
  APPLIED = 'APPLIED', // tour mà tour guide đã đăng ký tour chưa đc pick
  MATCHED = 'MATCHED', // Khách hàng pick tour guide X -> trạng thái A picked
  PAYMENT_SUCCESS = 'PAYMENT_SUCCESS', // Khách hàng thanh toán thành công tour
  EXPIRED_PAYMENT = 'EXPIRED_PAYMENT', // sau 1 giờ hết hạn thanh toán
  CUSTOMER_CANCELED = 'CUSTOMER_CANCELED',
  TOUR_GUIDE_CANCELED = 'TOUR_GUIDE_CANCELED',
  SUCCESSFULLY = 'SUCCESSFULLY', // tour đã thanh toán thành công và quá thời gian của tour.
}

export enum TourGuideApplyStatus {
  NA = 'NA',
  APPLIED = 'APPLIED',
  TOUR_GUIDE_CANCELED = 'TOUR_GUIDE_CANCELED',
  SYS_CANCELED = 'SYS_CANCELED',
  MATCH_WITH_OTHER = 'MATCH_WITH_OTHER',
}

export enum PhoneCode {
  VN = 'VN',
}
