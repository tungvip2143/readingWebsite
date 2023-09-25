import httpService from 'services/httpService';
import {
  RequestGetListToursByCategory,
  ResponseGetListToursByCategory,
} from './toursByCategory.interface';
import apiUrls from 'constants/apiUrls';
import queryString from 'query-string';

class ToursByCategoryServices {
  getListToursByCategory(
    param: RequestGetListToursByCategory
  ): Promise<ResponseGetListToursByCategory> {
    return httpService.axios.get(
      `${apiUrls.TOUR.GET_LIST_BY_CATEGORY}?${queryString.stringify(param, {
        skipEmptyString: true,
      })}`
    );
  }
}

export default new ToursByCategoryServices();
