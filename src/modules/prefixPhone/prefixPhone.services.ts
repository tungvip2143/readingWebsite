import httpService from 'services/httpService';
import { ResponseGetListPrefixPhone } from './prefixPhone.interface';
import apiUrls from 'constants/apiUrls';

class PrefixPhoneServices {
  getListPrefixPhone(): Promise<ResponseGetListPrefixPhone> {
    return httpService.axios.get(`${apiUrls.PREFIX_PHONE.GET_LIST}`);
  }
}

export default new PrefixPhoneServices();
