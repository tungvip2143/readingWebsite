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

export type RequestSignUp = {
  phone: string;
  phoneCode: string;
  email: string;
  lastName: string;
  firstName: string;
  gender: string;
  password: string;
  confirmPassword: string;
  acceptTerm: boolean;
};

export type ResponseSignUp = AxiosResponse<{ message: string; otp: OTP }>;
