import httpService from 'services/httpService';
import {
  RequestGetDetailHotDeal,
  ResponseGetDetailHotDeal,
  RequestGetListHotDeal,
  ResponseGetListHotDeal,
  RequestDeleteHotDeal,
  ResponseDeleteHotDeal,
  RequestUpdateHotDeal,
  ResponseUpdateHotDeal,
  RequestCreateHotDeal,
  ResponseCreateHotDeal,
} from './hotDeal.interface';
import apiUrls from 'constants/apiUrls';
import queryString from 'query-string';

class HotDealServices {
  getListHotDeal(body: RequestGetListHotDeal): Promise<ResponseGetListHotDeal> {
    return httpService.axios.get(
      `${apiUrls.HOT_DEAL.GET_LIST}?${queryString.stringify(body, {
        skipEmptyString: true,
      })}`
    );
  }

  getDetailHotDeal(id: RequestGetDetailHotDeal): Promise<ResponseGetDetailHotDeal> {
    return httpService.axios.get(`${apiUrls.HOT_DEAL.GENERAL}/${id}`);
  }

  createHotDeal(body: RequestCreateHotDeal): Promise<ResponseCreateHotDeal> {
    return httpService.axios.post(`${apiUrls.HOT_DEAL.CREATE}`, body);
  }

  updateHotDeal({ id, body }: RequestUpdateHotDeal): Promise<ResponseUpdateHotDeal> {
    return httpService.axios.patch(`${apiUrls.HOT_DEAL.GENERAL}/${id}/update`, body);
  }

  deleteHotDeal(id: RequestDeleteHotDeal): Promise<ResponseDeleteHotDeal> {
    return httpService.axios.delete(`${apiUrls.HOT_DEAL.GENERAL}/${id}`);
  }
}

export default new HotDealServices();
