'use client';
import pageUrls from 'constants/pageUrls';
import { showError } from 'helpers/toast';
import { ResponseCommon } from 'interfaces/common';
import { isEmpty } from 'lodash';
import { RequestFacebookLogin } from 'modules/facebook/facebookAuth.interface';
import facebookAuthService from 'modules/facebook/facebookAuth.service';
import {
  RequestChangePassword,
  RequestChangePasswordEmail,
  RequestForgotPassword,
  RequestResendOTP,
  RequestVerifyForgotPassword,
  ResponseChangePassword,
  ResponseChangePasswordEmail,
  ResponseForgotPassword,
  ResponseResendOTP,
  ResponseVerifyForgotPassword,
} from 'modules/forgotPassword/forgotPassword.interface';
import forgotPasswordServices from 'modules/forgotPassword/forgotPassword.services';
import { RequestGoogleLogin } from 'modules/google/googleAuth.interface';
import googleAuthService from 'modules/google/googleAuth.service';
import { IUser, RequestLogin } from 'modules/login/login.interface';
import loginServices from 'modules/login/login.services';
import {
  RequestLoginPhone,
  RequestLoginSocial,
  ResponseLoginPhone,
  ResponseLoginSocial,
  ResponseLoginTourGuide,
  ResponseLoginVendor,
} from 'modules/loginPhone/loginPhone.interface';
import loginPhoneServices from 'modules/loginPhone/loginPhone.services';
import { RequestSignUp, ResponseSignUp } from 'modules/signUp/signUp.interface';
import signUpServices from 'modules/signUp/signUp.services';
import { TourGuide } from 'modules/tourGuide/article.interface';
import { Vendor } from 'modules/vendor/vendor.interface';
import {
  RequestVerifyRegisterCustomer,
  ResponseVerifyRegisterCustomer,
} from 'modules/verifyRegisterCustomer/verifyRegisterCustomer.interface';
import verifyRegisterCustomerServices from 'modules/verifyRegisterCustomer/verifyRegisterCustomer.services';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import broadcastService from 'services/broadcastService';
import httpService from 'services/httpService';

type AuthContextType = {
  accessToken: string;
  user?: IUser | TourGuide | Vendor;
  isLogining: boolean;
  isLogged: boolean;
  signIn: (body: RequestLogin) => void;
  signInPhone: (body: RequestLoginPhone) => Promise<ResponseCommon<ResponseLoginPhone> | undefined>;
  signUp: (body: RequestSignUp) => Promise<ResponseCommon<ResponseSignUp> | undefined>;
  signUpRoleTourGuide: (body: RequestSignUp) => Promise<ResponseCommon<ResponseSignUp> | undefined>;
  verifyRegisterCustomer: (
    body: RequestVerifyRegisterCustomer
  ) => Promise<ResponseCommon<ResponseVerifyRegisterCustomer> | undefined>;
  verifyRegisterTourGuide: (
    body: RequestVerifyRegisterCustomer
  ) => Promise<ResponseCommon<ResponseVerifyRegisterCustomer> | undefined>;
  signOut: () => void;
  signInRoleTourGuide: (
    body: RequestLoginPhone
  ) => Promise<ResponseCommon<ResponseLoginTourGuide> | undefined>;
  signInRoleVendor: (
    body: RequestLoginPhone
  ) => Promise<ResponseCommon<ResponseLoginVendor> | undefined>;
  forgotPassword: (
    body: RequestForgotPassword
  ) => Promise<ResponseCommon<ResponseForgotPassword> | undefined>;
  verifyForgotPassword: (
    body: RequestVerifyForgotPassword
  ) => Promise<ResponseCommon<ResponseVerifyForgotPassword> | undefined>;
  changePassword: (
    body: RequestChangePassword
  ) => Promise<ResponseCommon<ResponseChangePassword> | undefined>;
  changePasswordEmail: (
    body: RequestChangePasswordEmail
  ) => Promise<ResponseCommon<ResponseChangePasswordEmail> | undefined>;
  signInGoogle: (
    body: RequestGoogleLogin
  ) => Promise<ResponseCommon<ResponseLoginSocial> | undefined>;
  signInFacebook: (
    body: RequestFacebookLogin
  ) => Promise<ResponseCommon<ResponseLoginSocial> | undefined>;
  resendOTP: (body: RequestResendOTP) => Promise<ResponseCommon<ResponseResendOTP> | undefined>;
};

const AuthContext = React.createContext<AuthContextType>({
  accessToken: '',
  user: undefined,
  isLogining: false,
  isLogged: false,
  signIn: () => {},
  signInPhone: () => Promise.resolve(undefined),
  signUp: () => Promise.resolve(undefined),
  signUpRoleTourGuide: () => Promise.resolve(undefined),
  verifyRegisterCustomer: () => Promise.resolve(undefined),
  verifyRegisterTourGuide: () => Promise.resolve(undefined),
  signOut: () => {},
  signInRoleTourGuide: () => Promise.resolve(undefined),
  signInRoleVendor: () => Promise.resolve(undefined),
  forgotPassword: () => Promise.resolve(undefined),
  verifyForgotPassword: () => Promise.resolve(undefined),
  changePassword: () => Promise.resolve(undefined),
  changePasswordEmail: () => Promise.resolve(undefined),
  signInGoogle: () => Promise.resolve(undefined),
  signInFacebook: () => Promise.resolve(undefined),
  resendOTP: () => Promise.resolve(undefined),
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
      | 'signUpRoleTourGuide'
      | 'verifyRegisterCustomer'
      | 'verifyRegisterTourGuide'
      | 'signOut'
      | 'signInRoleTourGuide'
      | 'signInRoleVendor'
      | 'forgotPassword'
      | 'verifyForgotPassword'
      | 'changePassword'
      | 'changePasswordEmail'
      | 'signInGoogle'
      | 'signInFacebook'
      | 'resendOTP'
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
    ({ accessToken, user }: { accessToken: string; user: IUser | TourGuide | Vendor }) => {
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

  const signUpRoleTourGuide = useCallback(
    (body: RequestSignUp): Promise<ResponseCommon<ResponseSignUp>> => {
      return new Promise((resolve, reject) => {
        (async () => {
          try {
            const response = await signUpServices.registerRoleTourGuide(body);
            resolve(response);
          } catch (error) {
            reject(error);
          }
        })();
      });
    },
    []
  );

  const signInRoleTourGuide = useCallback(
    (body: RequestLoginPhone): Promise<ResponseCommon<ResponseLoginTourGuide>> => {
      return new Promise((resolve, reject) => {
        (async () => {
          try {
            setState((prev) => ({
              ...prev,
              isLogining: true,
            }));
            const response = await loginPhoneServices.loginTourGuide(body);
            const accessToken = response?.data?.data?.accessToken;
            const user = response?.data?.data?.user;

            setState((prev) => ({
              ...prev,
              isLogining: false,
              isLogged: true,
              accessToken,
              user,
            }));

            onSignSuccess({ accessToken, user: user });
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

  const signInRoleVendor = useCallback(
    (body: RequestLoginPhone): Promise<ResponseCommon<ResponseLoginVendor>> => {
      return new Promise((resolve, reject) => {
        (async () => {
          try {
            setState((prev) => ({
              ...prev,
              isLogining: true,
            }));
            const response = await loginPhoneServices.loginVendor(body);
            const accessToken = response?.data?.data?.accessToken;
            const user = response?.data?.data?.user;

            setState((prev) => ({
              ...prev,
              isLogining: false,
              isLogged: true,
              accessToken,
              user,
            }));

            onSignSuccess({ accessToken, user: user });
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

  const verifyRegisterCustomer = useCallback(
    (
      body: RequestVerifyRegisterCustomer
    ): Promise<ResponseCommon<ResponseVerifyRegisterCustomer>> => {
      return new Promise((resolve, reject) => {
        (async () => {
          try {
            const response = await verifyRegisterCustomerServices.verify(body);
            resolve(response);
          } catch (error) {
            reject(error);
          }
        })();
      });
    },
    []
  );

  const verifyRegisterTourGuide = useCallback(
    (
      body: RequestVerifyRegisterCustomer
    ): Promise<ResponseCommon<ResponseVerifyRegisterCustomer>> => {
      return new Promise((resolve, reject) => {
        (async () => {
          try {
            const response = await verifyRegisterCustomerServices.verifyTourGuide(body);
            resolve(response);
          } catch (error) {
            reject(error);
          }
        })();
      });
    },
    []
  );

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

  const verifyForgotPassword = useCallback(
    (body: RequestVerifyForgotPassword): Promise<ResponseCommon<ResponseVerifyForgotPassword>> => {
      return new Promise((resolve, reject) => {
        (async () => {
          try {
            const { email } = body;
            const isEmail = !isEmpty(email);
            if (isEmail) {
              const response = await forgotPasswordServices.verifyForgotPasswordEmail(body);
              resolve(response);
              return;
            }
            const response = await forgotPasswordServices.verifyForgotPassword(body);
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

  const signInGoogle = useCallback(
    (body: RequestGoogleLogin): Promise<ResponseCommon<ResponseLoginSocial>> => {
      return new Promise((resolve, reject) => {
        (async () => {
          try {
            const response = await googleAuthService.signInWithGoogle();
            const provider = body.provider;
            const role = body.role;
            const bodyLoginSocial = {
              token: response?._tokenResponse?.oauthIdToken || '',
              provider: provider,
              role: role,
            };

            const resonseLoginSocial = await loginPhoneServices.loginSocial(bodyLoginSocial);

            const accessToken = resonseLoginSocial?.data?.data?.accessToken;
            const user = resonseLoginSocial?.data?.data?.user;

            setState((prev) => ({
              ...prev,
              isLogining: false,
              isLogged: true,
              accessToken,
              user,
            }));

            onSignSuccess({ accessToken, user });
            resolve(resonseLoginSocial);
          } catch (error) {
            reject(error);
          }
        })();
      });
    },
    [onSignSuccess]
  );

  const signInFacebook = useCallback(
    (body: RequestFacebookLogin): Promise<ResponseCommon<ResponseLoginSocial>> => {
      return new Promise((resolve, reject) => {
        (async () => {
          try {
            const response = await facebookAuthService.signInWithFacebook();
            const provider = body.provider;
            const role = body.role;
            const bodyLoginSocial = {
              token: response?._tokenResponse?.oauthIdToken || '',
              provider: provider,
              role: role,
            };

            const resonseLoginSocial = await loginPhoneServices.loginSocial(bodyLoginSocial);

            const accessToken = resonseLoginSocial?.data?.data?.accessToken;
            const user = resonseLoginSocial?.data?.data?.user;

            setState((prev) => ({
              ...prev,
              isLogining: false,
              isLogged: true,
              accessToken,
              user,
            }));

            onSignSuccess({ accessToken, user });
            resolve(resonseLoginSocial);
          } catch (error) {
            reject(error);
          }
        })();
      });
    },
    [onSignSuccess]
  );

  const resendOTP = useCallback(
    (body: RequestResendOTP): Promise<ResponseCommon<ResponseResendOTP>> => {
      return new Promise((resolve, reject) => {
        (async () => {
          try {
            const response = await forgotPasswordServices.resendOTP(body);
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
      signUpRoleTourGuide,
      verifyRegisterCustomer,
      verifyRegisterTourGuide,
      signOut,
      signInRoleTourGuide,
      signInRoleVendor,
      forgotPassword,
      verifyForgotPassword,
      changePassword,
      changePasswordEmail,
      signInGoogle,
      signInFacebook,
      resendOTP,
      ...state,
    };
  }, [
    signIn,
    signInPhone,
    signInRoleTourGuide,
    signInRoleVendor,
    signUp,
    signUpRoleTourGuide,
    verifyRegisterCustomer,
    verifyRegisterTourGuide,
    signOut,
    forgotPassword,
    verifyForgotPassword,
    changePassword,
    changePasswordEmail,
    signInGoogle,
    signInFacebook,
    resendOTP,
    state,
  ]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
