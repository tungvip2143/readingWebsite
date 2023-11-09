import { AxiosResponse } from 'axios';
import { IUser } from 'modules/login/login.interface';
import { TourGuide } from 'modules/tourGuide/article.interface';
import { Vendor } from 'modules/vendor/vendor.interface';
import { Method } from 'constants/common';
// export interface IUser {
//   id: number;
//   username: string;
//   firstName: string;
//   lastName: string;
//   fullName: string;
//   phone: string | number;
//   email: string;
//   avatar: string;
//   gender: Gender;
//   lastAccessToken: string;
//   refreshToken: string | null;
//   userType: Roles;
//   userStatus: UserStatus;
//   createdAt: Date | string;
//   updatedAt: Date | string;
// }

export type RequestLoginPhone = {
  phoneCode?: string;
  phone?: string;
  password: string;
  method: Method;
  email?: string;
};

export type ResponseLoginPhone = AxiosResponse<{ accessToken: string; user: IUser }>;

export interface ResponseLoginByRole<T> {
  accessToken: string;
  user: T;
}

export type ResponseLoginTourGuide = AxiosResponse<ResponseLoginByRole<TourGuide>>;
export type ResponseLoginVendor = AxiosResponse<ResponseLoginByRole<Vendor>>;

export type RequestLoginSocial = {
  token: string;
  provider: string;
  role: string;
};

export type ResponseLoginSocial = AxiosResponse<{ accessToken: string; user: IUser }>;
