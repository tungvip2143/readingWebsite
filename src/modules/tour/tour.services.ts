import httpService from 'services/httpService';
import {
  RequestCreateTour,
  RequestDeleteTour,
  RequestDetailTour,
  RequestEditTour,
  RequestGetListTour,
  ResponseCreateTour,
  ResponseDeleteTour,
  ResponseDetailTour,
  ResponseEditTour,
  ResponseGetListTour,
} from './tour.interface';
import apiUrls from 'constants/apiUrls';
import queryString from 'query-string';

class TourServices {
  getListTour(body: RequestGetListTour): Promise<ResponseGetListTour> {
    return httpService.axios.get(
      `${apiUrls.TOUR.GET_LIST}?${queryString.stringify(body, {
        skipEmptyString: true,
      })}`
    );
  }

  getListTourPublic(body: RequestGetListTour): Promise<ResponseGetListTour> {
    return httpService.axios.get(`${apiUrls.TOUR.GET_LIST_PUBLIC}?${queryString.stringify(body)}`);
  }

  getDetailTour(id: RequestDetailTour): Promise<ResponseDetailTour> {
    return httpService.axios.get(`${apiUrls.TOUR.CREATE}/${id}`);
  }

  getDetailTourPublic(id: RequestDetailTour): Promise<ResponseDetailTour> {
    return httpService.axios.get(`${apiUrls.TOUR.CREATE}/public/${id}`);
  }

  createTour(body: RequestCreateTour): Promise<ResponseCreateTour> {
    return httpService.axios.post(apiUrls.TOUR.CREATE, body);
  }

  editTour({ id, body }: RequestEditTour): Promise<ResponseEditTour> {
    return httpService.axios.patch(`${apiUrls.TOUR.CREATE}/${id}/update`, body);
  }

  deleteTour(id: RequestDeleteTour): Promise<ResponseDeleteTour> {
    return httpService.axios.delete(`${apiUrls.TOUR.CREATE}/${id}/delete`);
  }
}

export default new TourServices();
