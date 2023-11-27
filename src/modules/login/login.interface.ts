import { AxiosResponse } from 'axios';
import { Roles } from 'constants/common';

export interface IUser {
  _id: number;
  deleted_at: null | string; // Assuming it could be either null or a string
  email: string;
  fullname: string;
  phonenumber: string;
  date_of_birth: string; // Assuming it's a string representing a date
  gender: number;
  role: number;
  isVerify: boolean;
  isBlock: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type RequestLogin = {
  identifier: string;
  password: string;
};

export type ResponseLogin = AxiosResponse<{
  accessToken: string;
  accountLogin: IUser;
  refreshToken: string;
}>;
