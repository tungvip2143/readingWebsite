import httpService from 'services/httpService';
import {
  RequestGetListTourGuideSubscribe,
  ResponseGetListTourGuideSubscribe,
  RequestDeleteTourGuideSubscribe,
  ResponseDeleteTourGuideSubscribe,
  RequestCreateTourGuideSubscribe,
  ResponseCreateTourGuideSubscribe,
} from './tourGuideSubscribe.interface';
import apiUrls from 'constants/apiUrls';
import queryString from 'query-string';

class TourGuideSubscribeServices {
  getListTourGuideSubscribe(
    tourId: number,
    body: RequestGetListTourGuideSubscribe
  ): Promise<ResponseGetListTourGuideSubscribe> {
    return httpService.axios.get(
      `${apiUrls.TOURGUIDE_SUBSCRIBE.GET_LIST(tourId)}?${queryString.stringify(body)}`
    );
  }

  createTourGuideSubscribe(
    id: number,
    body: RequestCreateTourGuideSubscribe
  ): Promise<ResponseCreateTourGuideSubscribe> {
    return httpService.axios.post(`${apiUrls.TOURGUIDE_SUBSCRIBE.CREATE(id)}`, body);
  }

  deleteTourGuideSubscribe(
    tourGuideSubscribe: RequestDeleteTourGuideSubscribe
  ): Promise<ResponseDeleteTourGuideSubscribe> {
    return httpService.axios.delete(`${apiUrls.TOURGUIDE_SUBSCRIBE.DELETE(tourGuideSubscribe)}`);
  }
}

export default new TourGuideSubscribeServices();
