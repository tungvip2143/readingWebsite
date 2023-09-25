import httpService from 'services/httpService';
import {
  RequestGetDetailTourGuide,
  ResponseGetDetailTourGuide,
  RequestGetListTourGuide,
  ResponseGetListTourGuide,
  RequestDeleteTourGuide,
  ResponseDeleteTourGuide,
  RequestUpdateTourGuide,
  ResponseUpdateTourGuide,
  RequestCreateTourGuide,
  ResponseCreateTourGuide,
  RequestAcceptDraftTourGuide,
} from './tourGuide.interface';
import apiUrls from 'constants/apiUrls';
import queryString from 'query-string';

class TourGuideServices {
  getListTourGuide(param: RequestGetListTourGuide): Promise<ResponseGetListTourGuide> {
    return httpService.axios.get(
      `${apiUrls.TOUR_GUIDE}?${queryString.stringify(param, {
        skipEmptyString: true,
      })}`
    );
  }

  getDetailTourGuide(id: RequestGetDetailTourGuide): Promise<ResponseGetDetailTourGuide> {
    return httpService.axios.get(`${apiUrls.TOUR_GUIDE}/${id}`);
  }

  createTourGuide(body: RequestCreateTourGuide): Promise<ResponseCreateTourGuide> {
    return httpService.axios.post(`${apiUrls.TOUR_GUIDE}`, body);
  }

  updateTourGuide({ id, body }: RequestUpdateTourGuide): Promise<ResponseUpdateTourGuide> {
    return httpService.axios.patch(`${apiUrls.TOUR_GUIDE}/${id}/update-tour-guide`, body);
  }
  accpetDraftTourGuide({
    id,
    body,
  }: RequestAcceptDraftTourGuide): Promise<ResponseUpdateTourGuide> {
    return httpService.axios.patch(`${apiUrls.TOUR_GUIDE}/${id}/accept-draft`, body);
  }

  deleteTourGuide({ id }: RequestDeleteTourGuide): Promise<ResponseDeleteTourGuide> {
    return httpService.axios.delete(`${apiUrls.TOUR_GUIDE}/${id}`);
  }
  uploadFile(body: FormData) {
    return httpService.axios.post(`${apiUrls.UPLOAD_FILE_SINGLE}`, body, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  }
  getListBookingTourHistory(param: any): Promise<any> {
    return httpService.axios.get(
      `${apiUrls.TOUR_BOOKING}/${param?.id}/tour-guide?${queryString.stringify(param, {
        skipEmptyString: true,
      })}`
    );
  }
}

export default new TourGuideServices();
