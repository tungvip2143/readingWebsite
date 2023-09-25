import { AxiosResponse } from 'axios';
import { Gender, Method, OTPAction, Roles, UserStatus } from 'constants/common';

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

export type RequestForgotPassword = {
  phone: string | undefined;
  phoneCode: string | undefined;
  email: string | undefined;
  role: Roles;
  method: Method;
};

export type ResponseForgotPassword = AxiosResponse<{ message: string; otp: OTP }>;

export type RequestVerifyForgotPassword = {
  phoneCode: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  role: Roles;
  otp: string;
};

export type ResponseVerifyForgotPassword = AxiosResponse<{ message: string; otp: OTP }>;

export type RequestChangePassword = {
  phone: string;
  phoneCode: string;
  role: Roles;
  password: string;
  confirmPassword: string;
};

export type ResponseChangePassword = AxiosResponse<{ message: string; otp: OTP }>;

export type RequestChangePasswordEmail = {
  email: string;
  role: Roles;
  password: string;
  confirmPassword: string;
};

export type ResponseChangePasswordEmail = AxiosResponse<{ message: string; otp: OTP }>;

export type RequestResendOTP = {
  action: OTPAction;
  role: string;
  method: Method;
  phone: string | undefined;
  phoneCode: string | undefined;
  email: string | undefined;
};

export type ResponseResendOTP = AxiosResponse<{ message: string; otp: OTP }>;
