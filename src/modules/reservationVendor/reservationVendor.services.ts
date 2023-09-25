import httpService from 'services/httpService';
import {
  RequestCreateReservationVendor,
  RequestGetListReservationVendor,
  ResponseCreateReservationVendor,
  ResponseGetDetailReservationVendor,
  ResponseGetListReservationVendor,
  ResponseConfirmReservationVendor,
  RequestConfirmReservationVendor,
  ResponseCancelReservationVendor,
  ResponseGetReservationVendorSuccessfulCount,
} from './reservationVendor.interface';
import apiUrls from 'constants/apiUrls';
import queryString from 'query-string';

class ReservationVendorServices {
  getListReservationVendor(
    body: RequestGetListReservationVendor
  ): Promise<ResponseGetListReservationVendor> {
    return httpService.axios.get(
      `${apiUrls.RESERVATIONVENDOR.GET_LIST}?${queryString.stringify(body, {
        skipEmptyString: true,
      })}`
    );
  }

  createBookingTour(
    body: RequestCreateReservationVendor
  ): Promise<ResponseCreateReservationVendor> {
    return httpService.axios.post(`${apiUrls.RESERVATIONVENDOR.GET_LIST}/create`, body);
  }

  getDetailReservationVendor(id: number | string): Promise<ResponseGetDetailReservationVendor> {
    return httpService.axios.get(`${apiUrls.RESERVATIONVENDOR.GET_LIST}/${id}`);
  }

  acceptReservationVendor(
    id: RequestConfirmReservationVendor
  ): Promise<ResponseConfirmReservationVendor> {
    return httpService.axios.patch(apiUrls.RESERVATIONVENDOR.CONFIRM(id));
  }

  cancelReservationVendor(
    id: RequestConfirmReservationVendor
  ): Promise<ResponseCancelReservationVendor> {
    return httpService.axios.patch(apiUrls.RESERVATIONVENDOR.CANCEL(id));
  }

  getReservationVendorSuccessfulCount(): Promise<ResponseGetReservationVendorSuccessfulCount> {
    return httpService.axios.get(
      `${apiUrls.RESERVATIONVENDOR.VENDOR_RESERVATION_SUCCESSFUL_COUNT}`
    );
  }
}

export default new ReservationVendorServices();
