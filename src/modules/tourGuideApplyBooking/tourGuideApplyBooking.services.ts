import httpService from 'services/httpService';
import {
  RequestGetDetailTourGuideApplyBooking,
  ResponseGetDetailTourGuideApplyBooking,
  RequestGetListTourGuideApplyBooking,
  ResponseGetListTourGuideApplyBooking,
  RequestDeleteTourGuideApplyBooking,
  ResponseDeleteTourGuideApplyBooking,
  RequestUpdateTourGuideApplyBooking,
  ResponseUpdateTourGuideApplyBooking,
  RequestCreateTourGuideApplyBooking,
  ResponseCreateTourGuideApplyBooking,
} from './tourGuideApplyBooking.interface';
import pageUrls from 'constants/pageUrls';
import apiUrls from 'constants/apiUrls';

class TourGuideApplyBookingServices {
  getListTourGuideApplyBooking(
    body: RequestGetListTourGuideApplyBooking
  ): Promise<ResponseGetListTourGuideApplyBooking> {
    const { tourBookingId } = body;
    const id = Number(tourBookingId);
    return httpService.axios.get(apiUrls.TOUR_GUIDE_APPLY_BOOKING.APPLY(id));
  }

  getDetailTourGuideApplyBooking(
    id: RequestGetDetailTourGuideApplyBooking
  ): Promise<ResponseGetDetailTourGuideApplyBooking> {
    return httpService.axios.get(`https://dummyjson.com/products/${id}`);
  }

  createTourGuideApplyBooking({
    body,
  }: RequestCreateTourGuideApplyBooking): Promise<ResponseCreateTourGuideApplyBooking> {
    return httpService.axios.post(`https://dummyjson.com/products`, body);
  }

  updateTourGuideApplyBooking({
    id,
    body,
  }: RequestUpdateTourGuideApplyBooking): Promise<ResponseUpdateTourGuideApplyBooking> {
    return httpService.axios.patch(`https://dummyjson.com/products/${id}`, body);
  }

  deleteTourGuideApplyBooking({
    id,
  }: RequestDeleteTourGuideApplyBooking): Promise<ResponseDeleteTourGuideApplyBooking> {
    return httpService.axios.delete(`https://dummyjson.com/products/${id}`);
  }
}

export default new TourGuideApplyBookingServices();
