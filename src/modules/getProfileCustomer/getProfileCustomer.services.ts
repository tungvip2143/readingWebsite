import httpService from 'services/httpService';
import {
  RequestGetListGetProfileCustomer,
  ResponseGetListGetProfileCustomer,
} from './getProfileCustomer.interface';
import apiUrls from 'constants/apiUrls';
import queryString from 'query-string';

class GetProfileCustomerServices {
  getListGetProfileCustomer(
    body: RequestGetListGetProfileCustomer
  ): Promise<ResponseGetListGetProfileCustomer> {
    return httpService.axios.get(
      `${apiUrls.GET_PROFILE}?${queryString.stringify(body, {
        skipEmptyString: true,
      })}`
    );
  }
}

export default new GetProfileCustomerServices();
