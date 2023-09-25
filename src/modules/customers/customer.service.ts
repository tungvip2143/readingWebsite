import httpService from 'services/httpService';
import {
  RequestGetListCustomer,
  ResponseGetListCustomer,
  RequestGetDetailCustomer,
  ResponseGetDetailCustomer,
  RequestGetTourBookingListCustomer,
  ResponseGetTourBookingListCustomer,
  GetTourBookingListCustomerResult,
  RequestChangeStatus,
  ResponseChangeStatus,
} from './customer.interface';
import apiUrls from 'constants/apiUrls';
import queryString from 'query-string';

class CustomerService {
  getCustomerList(body: RequestGetListCustomer): Promise<ResponseGetListCustomer> {
    return httpService.axios.get(
      `${apiUrls.CUSTOMER}?${queryString.stringify(body, {
        skipEmptyString: true,
      })}`
    );
  }
  getDetailCustomer(id: RequestGetDetailCustomer): Promise<ResponseGetDetailCustomer> {
    return httpService.axios.get(`${apiUrls.CUSTOMER}/${id}`);
  }
  getTourBookingList({
    id,
    body,
  }: GetTourBookingListCustomerResult): Promise<ResponseGetTourBookingListCustomer> {
    return httpService.axios.get(
      `${apiUrls.TOUR_BOOKING}/${id}/customer?${queryString.stringify(body)}`
    );
  }

  changeStatusCustomer({ id, body }: RequestChangeStatus): Promise<ResponseChangeStatus> {
    return httpService.axios.patch(`${apiUrls.CUSTOMER}/${id}/update`, body);
  }
}

export default new CustomerService();
