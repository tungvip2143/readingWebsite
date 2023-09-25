import { AxiosResponse } from 'axios';
import { Gender, Roles, UserStatus } from 'constants/common';

export interface OTP {
  id: number;
  action: string;
  userId: string | null;
  phone: string;
  code: string;
  isUsed: string | number;
  expiredAt: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type RequestVerifyRegisterCustomer = {
  phoneCode: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  otp: string
};

export type ResponseVerifyRegisterCustomer = AxiosResponse<{ message: string; otp: OTP }>;
