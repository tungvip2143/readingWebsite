'use client';
import pageUrls from 'constants/pageUrls';
import { showError } from 'helpers/toast';
import { ResponseCommon } from 'interfaces/common';
import {
  RequestChangePassword,
  RequestChangePasswordEmail,
  RequestForgotPassword,
  ResponseChangePassword,
  ResponseChangePasswordEmail,
  ResponseForgotPassword,
} from 'modules/forgotPassword/forgotPassword.interface';
import forgotPasswordServices from 'modules/forgotPassword/forgotPassword.services';
import { IUser, RequestLogin } from 'modules/login/login.interface';
import loginServices from 'modules/login/login.services';
import { RequestLoginPhone, ResponseLoginPhone } from 'modules/loginPhone/loginPhone.interface';
import loginPhoneServices from 'modules/loginPhone/loginPhone.services';
import { RequestSignUp, ResponseSignUp } from 'modules/signUp/signUp.interface';
import signUpServices from 'modules/signUp/signUp.services';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import broadcastService from 'services/broadcastService';
import httpService from 'services/httpService';

type AuthContextType = {
  accessToken: string;
  user?: IUser;
  isLogining: boolean;
  isLogged: boolean;
  signIn: (body: RequestLogin) => void;
  signInPhone: (body: RequestLoginPhone) => Promise<ResponseCommon<ResponseLoginPhone> | undefined>;
  signUp: (body: RequestSignUp) => Promise<ResponseCommon<ResponseSignUp> | undefined>;
  signOut: () => void;
  forgotPassword: (
    body: RequestForgotPassword
  ) => Promise<ResponseCommon<ResponseForgotPassword> | undefined>;
  changePassword: (
    body: RequestChangePassword
  ) => Promise<ResponseCommon<ResponseChangePassword> | undefined>;
  changePasswordEmail: (
    body: RequestChangePasswordEmail
  ) => Promise<ResponseCommon<ResponseChangePasswordEmail> | undefined>;
};

const AuthContext = React.createContext<AuthContextType>({
  accessToken: '',
  user: undefined,
  isLogining: false,
  isLogged: false,
  signIn: () => {},
  signInPhone: () => Promise.resolve(undefined),
  signUp: () => Promise.resolve(undefined),
  signOut: () => {},
  forgotPassword: () => Promise.resolve(undefined),
  changePassword: () => Promise.resolve(undefined),
  changePasswordEmail: () => Promise.resolve(undefined),
});

export const useSession = () => React.useContext(AuthContext);

export default function AuthProvider(props: { children: React.ReactNode }) {
  const { children } = props;
  const [state, setState] = useState<
    Omit<
      AuthContextType,
      | 'signIn'
      | 'signInPhone'
      | 'signUp'
      | 'signOut'
      | 'forgotPassword'
      | 'changePassword'
      | 'changePasswordEmail'
    >
  >({
    accessToken: httpService.getTokenFromLocalStorage() || '',
    user: httpService.getUserFromLocalStorage(),
    isLogged: !!httpService.getTokenFromLocalStorage(),
    isLogining: false,
  });

  useEffect(() => {
    httpService.attachTokenToHeader(state.accessToken);
  }, [state.accessToken]);

  const onSignSuccess = useCallback(
    ({ accessToken, user }: { accessToken: string; user: IUser }) => {
      httpService.attachTokenToHeader(accessToken);
      httpService.saveTokenToLocalStorage(accessToken);
      httpService.saveUserToStorage(user);

      broadcastService.channelSwitchUser().postMessageReload();
    },
    []
  );

  const signIn = useCallback(
    (body: RequestLogin) => {
      (async () => {
        try {
          setState((prev) => ({
            ...prev,
            isLogining: true,
          }));
          const response = await loginServices.login(body);
          const accessToken = response?.data?.accessToken;
          const user = response?.data?.accountLogin;

          setState((prev) => ({
            ...prev,
            isLogining: false,
            isLogged: true,
            accessToken,
            user,
          }));

          onSignSuccess({ accessToken, user });
        } catch (error) {
          showError(error);
        } finally {
          setState((prev) => ({
            ...prev,
            isLogining: false,
          }));
        }
      })();
    },
    [onSignSuccess]
  );

  const signInPhone = useCallback(
    (body: RequestLoginPhone): Promise<ResponseCommon<ResponseLoginPhone>> => {
      return new Promise((resolve, reject) => {
        (async () => {
          try {
            setState((prev) => ({
              ...prev,
              isLogining: true,
            }));
            const response = await loginPhoneServices.login(body);
            const accessToken = response?.data?.data?.accessToken;
            const user = response?.data?.data?.user;

            setState((prev) => ({
              ...prev,
              isLogining: false,
              isLogged: true,
              accessToken,
              user,
            }));

            onSignSuccess({ accessToken, user });
            resolve(response);
          } catch (error) {
            reject(error);
          } finally {
            setState((prev) => ({
              ...prev,
              isLogining: false,
            }));
          }
        })();
      });
    },
    [onSignSuccess]
  );

  const signUp = useCallback((body: RequestSignUp): Promise<ResponseCommon<ResponseSignUp>> => {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const response = await signUpServices.register(body);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }, []);

  const signOut = useCallback(() => {
    httpService.clearUserInfo();
    broadcastService.channelSwitchUser().postMessageReload();
    window.location.href = pageUrls.Homepage;
  }, []);

  const forgotPassword = useCallback(
    (body: RequestForgotPassword): Promise<ResponseCommon<ResponseForgotPassword>> => {
      return new Promise((resolve, reject) => {
        (async () => {
          try {
            const response = await forgotPasswordServices.forgotPassword(body);
            resolve(response);
          } catch (error) {
            reject(error);
          }
        })();
      });
    },
    []
  );

  const changePassword = useCallback(
    (body: RequestChangePassword): Promise<ResponseCommon<ResponseChangePassword>> => {
      return new Promise((resolve, reject) => {
        (async () => {
          try {
            const response = await forgotPasswordServices.changePassword(body);
            resolve(response);
          } catch (error) {
            reject(error);
          }
        })();
      });
    },
    []
  );

  const changePasswordEmail = useCallback(
    (body: RequestChangePasswordEmail): Promise<ResponseCommon<ResponseChangePasswordEmail>> => {
      return new Promise((resolve, reject) => {
        (async () => {
          try {
            const response = await forgotPasswordServices.changePasswordEmail(body);
            resolve(response);
          } catch (error) {
            reject(error);
          }
        })();
      });
    },
    []
  );

  const values = useMemo(() => {
    return {
      signIn,
      signInPhone,
      signUp,
      signOut,
      forgotPassword,
      changePassword,
      changePasswordEmail,
      ...state,
    };
  }, [
    signIn,
    signInPhone,
    signUp,
    signOut,
    forgotPassword,
    changePassword,
    changePasswordEmail,
    state,
  ]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
