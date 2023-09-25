import httpService from 'services/httpService';
import {
  ResponseGetListVendorRecommendation,
  ResquestGetListVendorRecommendation,
} from './vendorRecommendation.interface';
import apiUrls from 'constants/apiUrls';
import queryString from 'query-string';

class VendorRecommendationServices {
  getListVendorRecommendation(
    body: ResquestGetListVendorRecommendation
  ): Promise<ResponseGetListVendorRecommendation> {
    return httpService.axios.get(
      `${apiUrls.VENDOR_RECOMMENDATION.GET_LIST}?${queryString.stringify(body, {
        skipEmptyString: true,
      })}`
    );
  }
}
export default new VendorRecommendationServices();
