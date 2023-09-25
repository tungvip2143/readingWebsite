import httpService from 'services/httpService';
import {
  RequestDeleteMyTourBooking,
  RequestGetListMyTourBooking,
  ResponseDeleteMyTourBooking,
  ResponseGetListMyTourBooking,
} from './myTourBooking.interface';
import apiUrls from 'constants/apiUrls';
import queryString from 'query-string';

class MyTourBookingServices {
  getListMyTourBooking(body: RequestGetListMyTourBooking): Promise<ResponseGetListMyTourBooking> {
    return httpService.axios.get(
      `${apiUrls.MY_TOUR_BOOKING}?${queryString.stringify(body, {
        skipEmptyString: true,
      })}`
    );
  }
  deleteMyTourBooking({ id }: RequestDeleteMyTourBooking): Promise<ResponseDeleteMyTourBooking> {
    return httpService.axios.patch(`${apiUrls.TOUR_BOOKING}/${id}/cancel`);
  }
}

export default new MyTourBookingServices();
