import httpService from 'services/httpService';
import { RequestChangePassword, RequestChangePasswordEmail, RequestForgotPassword, RequestResendOTP, RequestVerifyForgotPassword, ResponseChangePassword, ResponseChangePasswordEmail, ResponseForgotPassword, ResponseResendOTP, ResponseVerifyForgotPassword } from './forgotPassword.interface';
import apiUrls from 'constants/apiUrls';
import { ResponseCommon } from 'interfaces/common';
import { AxiosRequestConfig } from 'axios';
import { OTPAction } from 'constants/common';

class ForgotPasswordService {
  forgotPassword(body: RequestForgotPassword): Promise<ResponseCommon<ResponseForgotPassword>> {
    return httpService.axios.post(apiUrls.FORGOT_PASSWORD.FORGOT, body);
  }

  verifyForgotPassword(
    body: RequestVerifyForgotPassword
  ): Promise<ResponseCommon<ResponseVerifyForgotPassword>> {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        'otp-code': body.otp,
        'otp-action': OTPAction.FORGOT_PASSWORD,
      },
    };

    return httpService.axios.post(
      apiUrls.FORGOT_PASSWORD.VERIFY_OTP,
      { phone: body.phone, phoneCode: body.phoneCode, role: body.role },
      requestConfig
    );
  }

  verifyForgotPasswordEmail(
    body: RequestVerifyForgotPassword
  ): Promise<ResponseCommon<ResponseVerifyForgotPassword>> {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        'otp-code': body.otp,
        'otp-action': OTPAction.FORGOT_PASSWORD,
      },
    };

    return httpService.axios.post(
      apiUrls.FORGOT_PASSWORD.VERIFY_OTP_EMAIL,
      { email: body.email, role: body.role },
      requestConfig
    );
  }

  changePassword(body: RequestChangePassword): Promise<ResponseCommon<ResponseChangePassword>> {
    return httpService.axios.post(apiUrls.FORGOT_PASSWORD.CHANGE_PASSWORD, body);
  }

  changePasswordEmail(body: RequestChangePasswordEmail): Promise<ResponseCommon<ResponseChangePasswordEmail>> {
    return httpService.axios.post(apiUrls.FORGOT_PASSWORD.CHANGE_PASSWORD_EMAIL, body);
  }

  resendOTP(body: RequestResendOTP): Promise<ResponseCommon<ResponseResendOTP>> {
    return httpService.axios.post(apiUrls.RESEND_OTP, body);
  }
}

export default new ForgotPasswordService();
