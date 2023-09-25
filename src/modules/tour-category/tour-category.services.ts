import httpService from 'services/httpService';
import {
  ResponseGetListTotalBookingSuccess,
  ResponseGetListTourCategory,
} from './tour-category.interface';
import apiUrls from 'constants/apiUrls';

class TourCategoryServices {
  getListTourCategory(): Promise<ResponseGetListTourCategory> {
    return httpService.axios.get(`${apiUrls.TOUR_CATEGORY.GET_LIST}`);
  }

  getListTotalBookingSuccess(): Promise<ResponseGetListTotalBookingSuccess> {
    return httpService.axios.get(`${apiUrls.TOUR_CATEGORY.GET_LIST}/total-booking-success`);
  }
}

export default new TourCategoryServices();
