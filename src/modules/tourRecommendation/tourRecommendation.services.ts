import httpService from 'services/httpService';
import {
  ResponseGetListTourRecommendation,
  ResquestGetListTourRecommendation,
} from './tourRecommendation.interface';
import apiUrls from 'constants/apiUrls';
import queryString from 'query-string';

class TourRecommendationServices {
  getListTourRecommendation(
    body: ResquestGetListTourRecommendation
  ): Promise<ResponseGetListTourRecommendation> {
    return httpService.axios.get(
      `${apiUrls.TOUR_RECOMMENDATION.GET_LIST}?${queryString.stringify(body, {
        skipEmptyString: true,
      })}`
    );
  }
}
export default new TourRecommendationServices();
