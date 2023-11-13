import { AxiosResponse } from 'axios';
import { Roles } from 'constants/common';

export interface IUser {
  _id: number;
  deleted_at: null | string;
  email: string;
  fullname: string;
  phonenumber: string;
  date_of_birth: string;
  gender: number;
  role: number;
  isVerify: boolean;
  isBlock: boolean;
  createdAt: string;
  updatedAt: string;
}

export type RequestLogin = {
  identifier: string;
  password: string;
};

export type ResponseLogin = AxiosResponse<{ accessToken: string; user: IUser }>;
