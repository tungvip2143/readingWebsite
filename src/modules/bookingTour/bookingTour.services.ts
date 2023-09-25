import httpService from 'services/httpService';
import {
  RequestGetDetailBookingTour,
  ResponseGetDetailBookingTour,
  RequestGetListBookingTour,
  ResponseGetListBookingTour,
  RequestDeleteBookingTour,
  ResponseDeleteBookingTour,
  RequestUpdateBookingTour,
  ResponseUpdateBookingTour,
  RequestCreateBookingTour,
  ResponseCreateBookingTour,
  RequestApplyBookingTour,
  ResponseApplyBookingTour,
  RequestCancelApplyBooking,
  ResponseMatchTourGuide,
  RequestMatchTourGuide,
} from './bookingTour.interface';
import queryString from 'query-string';
import apiUrls from 'constants/apiUrls';

class BookingTourServices {
  getListBookingTour(param: RequestGetListBookingTour): Promise<ResponseGetListBookingTour> {
    return httpService.axios.get(
      `${apiUrls.TOUR_BOOKING}/list?${queryString.stringify(param, {
        skipEmptyString: true,
      })}`
    );
  }

  getDetailBookingTour(id: RequestGetDetailBookingTour): Promise<ResponseGetDetailBookingTour> {
    return httpService.axios.get(`${apiUrls.TOUR_BOOKING}/${id}`);
  }

  createBookingTour({ id, body }: RequestCreateBookingTour): Promise<ResponseCreateBookingTour> {
    return httpService.axios.post(`${apiUrls.TOUR_BOOKING}/${id}/booking`, body);
  }

  matchTourGuide({
    tourBookingId,
    tourGuideId,
  }: RequestMatchTourGuide): Promise<ResponseMatchTourGuide> {
    const body = { tourBookingId: tourBookingId, tourGuideId: tourGuideId };
    return httpService.axios.patch(
      `${apiUrls.TOUR_BOOKING}/${tourBookingId}/match-with/${tourGuideId}`,
      body
    );
  }
  getListBookingTourByTourGuide(
    param: RequestGetListBookingTour
  ): Promise<ResponseGetListBookingTour> {
    return httpService.axios.get(
      `${apiUrls.TOUR_BOOKING}/${param?.tourGuideId}/tour-guide?${queryString.stringify(param, {
        skipEmptyString: true,
      })}`
    );
  }
  updateBookingTour({ id, body }: RequestUpdateBookingTour): Promise<ResponseUpdateBookingTour> {
    return httpService.axios.patch(`https://dummyjson.com/products/${id}`, body);
  }

  deleteBookingTour({ id }: RequestDeleteBookingTour): Promise<ResponseDeleteBookingTour> {
    return httpService.axios.delete(`https://dummyjson.com/products/${id}`);
  }

  applyBookingTour(id: number, body: RequestApplyBookingTour): Promise<ResponseApplyBookingTour> {
    return httpService.axios.post(apiUrls.TOUR_GUIDE_APPLY_BOOKING.APPLY(id), body);
  }

  cancelApplyBookingTour(
    id: number,
    body: RequestCancelApplyBooking
  ): Promise<ResponseApplyBookingTour> {
    return httpService.axios.patch(apiUrls.TOUR_GUIDE_APPLY_BOOKING.CANCEL(id), body);
  }
}

export default new BookingTourServices();
