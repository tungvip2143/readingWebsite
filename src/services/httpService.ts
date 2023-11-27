import { IUser } from 'modules/login/login.interface';
import { localStorageFunc } from './../helpers/common';
import axios, { AxiosInstance } from 'axios';
import { cloneDeep, isArray, isObject, isString } from 'lodash';
import { Article } from 'modules/article/article.interface';

export const KEY_TOKEN = 'dzb_auth';
export const KEY_USER = 'dzb_user';

const iterateNestObject = (obj: { [key: string]: any }) => {
  Object.keys(obj).forEach((key) => {
    if (isString(obj[key])) {
      obj[key] = obj[key].trim();
    }

    if (isObject(obj[key]) && obj[key] !== null) {
      iterateNestObject(obj[key]);
    }

    if (isArray(obj[key])) {
      obj[key].forEach((eachValue: any) => {
        if (isString(eachValue)) {
          eachValue.trim();
        }

        if (isObject(eachValue)) {
          iterateNestObject(eachValue);
        }
      });
    }
  });
};

const parseToken = (token: string) => {
  return `Bearer ${token}`;
};

class HttpService {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create();
    this.axios.defaults.withCredentials = false;

    //! Interceptor request
    this.axios.interceptors.request.use(
      (config) => {
        const nextConfig = cloneDeep(config);
        const token = localStorageFunc?.getItem(KEY_TOKEN) || '';
        config.headers['Authorization'] = parseToken(token);

        const body = nextConfig?.data;
        if (isObject(body)) {
          iterateNestObject(body);
        }
        return nextConfig;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    //! Interceptor response
    this.axios.interceptors.response.use(
      function (config) {
        const statusCode = config.data?.data?.status;
        if (statusCode >= 400 && statusCode <= 499) {
          return Promise.reject(config?.data?.data?.message);
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }

  attachTokenToHeader(token: string) {
    this.axios.interceptors.request.use(
      function (config) {
        config.headers['Authorization'] = parseToken(token);
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }

  saveTokenToLocalStorage(token: string) {
    localStorageFunc?.setItem(KEY_TOKEN, token);
  }

  saveUserToStorage(user: IUser | Article) {
    localStorageFunc?.setItem(KEY_USER, JSON.stringify(user));
  }

  getTokenFromLocalStorage() {
    const token = localStorageFunc?.getItem(KEY_TOKEN);

    return token;
  }

  getUserFromLocalStorage() {
    const user = localStorageFunc?.getItem(KEY_USER);

    return user ? JSON.parse(user) : undefined;
  }

  clearUserInfo() {
    localStorageFunc?.removeItem(KEY_TOKEN);
    localStorageFunc?.removeItem(KEY_USER);
  }
}

const httpService = new HttpService();
export default httpService;
