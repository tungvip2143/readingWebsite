import httpService from 'services/httpService';
import { RequestLogin, ResponseLogin } from './login.interface';
import apiUrls from 'constants/apiUrls';
import { ResponseCommon } from 'interfaces/common';

class LoginService {
  login(body: RequestLogin): Promise<ResponseLogin> {
    return httpService.axios.post(apiUrls.LOGIN, body);
  }
}

export default new LoginService();
