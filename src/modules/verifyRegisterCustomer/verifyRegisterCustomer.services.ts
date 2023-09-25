import httpService from 'services/httpService';
import {
  RequestVerifyRegisterCustomer,
  ResponseVerifyRegisterCustomer,
} from './verifyRegisterCustomer.interface';
import apiUrls from 'constants/apiUrls';
import { ResponseCommon } from 'interfaces/common';
import { AxiosRequestConfig } from 'axios';
import { OTPAction } from 'constants/common';

class VerifyRegisterCustomerService {
  verify(
    body: RequestVerifyRegisterCustomer
  ): Promise<ResponseCommon<ResponseVerifyRegisterCustomer>> {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        'otp-code': body.otp,
        'otp-action': OTPAction.CUSTOMER_REGISTER,
      },
    };

    return httpService.axios.post(
      apiUrls.VERIFY_REGISTER_CUSTOMER,
      { phone: body.phone, phoneCode: body.phoneCode, email: body.email },
      requestConfig
    );
  }

  verifyTourGuide(
    body: RequestVerifyRegisterCustomer
  ): Promise<ResponseCommon<ResponseVerifyRegisterCustomer>> {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        'otp-code': body.otp,
        'otp-action': OTPAction.TOUR_GUIDE_REGISTER,
      },
    };

    return httpService.axios.post(
      apiUrls.VERIFY_REGISTER_BY_ROLE.TOUR_GUIDE,
      { phone: body.phone, phoneCode: body.phoneCode },
      requestConfig
    );
  }
}

export default new VerifyRegisterCustomerService();
