import { AxiosResponse } from 'axios';
import { Gender, Roles, UserStatus } from 'constants/common';

export interface IUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phone: string | number;
  email: string;
  avatar: string;
  gender: Gender;
  lastAccessToken: string;
  refreshToken: string | null;
  userType: Roles;
  userStatus: UserStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
  phoneCode?: string;
  name?: string;
  thumbnail?: string;
}

export type RequestLogin = {
  username: string;
  password: string;
};

export type ResponseLogin = AxiosResponse<{ accessToken: string; user: IUser }>;
