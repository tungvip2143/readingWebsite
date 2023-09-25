import httpService from 'services/httpService';
import { RequestSignUp, ResponseSignUp } from './signUp.interface';
import apiUrls from 'constants/apiUrls';
import { ResponseCommon } from 'interfaces/common';

class SignUpService {
  register(body: RequestSignUp): Promise<ResponseCommon<ResponseSignUp>> {
    return httpService.axios.post(apiUrls.REGISTER, body);
  }

  registerRoleTourGuide(body: RequestSignUp): Promise<ResponseCommon<ResponseSignUp>> {
    return httpService.axios.post(apiUrls.REGISTER_BY_ROLE.TOUR_GUIDE, body);
  }
}

export default new SignUpService();
