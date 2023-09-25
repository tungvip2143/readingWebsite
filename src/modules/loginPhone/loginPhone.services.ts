import httpService from 'services/httpService';
import {
  RequestLoginPhone,
  RequestLoginSocial,
  ResponseLoginPhone,
  ResponseLoginSocial,
  ResponseLoginTourGuide,
  ResponseLoginVendor,
} from './loginPhone.interface';
import apiUrls from 'constants/apiUrls';
import { ResponseCommon } from 'interfaces/common';

class LoginPhoneService {
  login(body: RequestLoginPhone): Promise<ResponseCommon<ResponseLoginPhone>> {
    return httpService.axios.post(apiUrls.LOGIN_PHONE, body);
  }

  loginTourGuide(body: RequestLoginPhone): Promise<ResponseCommon<ResponseLoginTourGuide>> {
    return httpService.axios.post(apiUrls.LOGIN_BY_ROLE.TOUR_GUIDE, body);
  }

  loginVendor(body: RequestLoginPhone): Promise<ResponseCommon<ResponseLoginVendor>> {
    return httpService.axios.post(apiUrls.LOGIN_BY_ROLE.VENDOR, body);
  }

  loginSocial(body : RequestLoginSocial): Promise<ResponseCommon<ResponseLoginSocial>> {
    return httpService.axios.post(apiUrls.LOGIN_SOCIAL, body);
  }
}

export default new LoginPhoneService();
