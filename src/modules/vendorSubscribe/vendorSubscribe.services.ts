import httpService from 'services/httpService';
import {
  RequestGetListVendorSubscribe,
  ResponseGetListVendorSubscribe,
  RequestDeleteVendorSubscribe,
  ResponseDeleteVendorSubscribe,
  RequestCreateVendorSubscribe,
  ResponseCreateVendorSubscribe,
} from './vendorSubscribe.interface';
import apiUrls from 'constants/apiUrls';
import queryString from 'query-string';

class VendorSubscribeServices {
  getListVendorSubscribe(
    tourId: number,
    body: RequestGetListVendorSubscribe
  ): Promise<ResponseGetListVendorSubscribe> {
    return httpService.axios.get(
      `${apiUrls.VENDOR_SUBSCRIBE.GET_LIST(tourId)}?${queryString.stringify(body)}`
    );
  }

  createVendorSubscribe(
    id: number,
    body: RequestCreateVendorSubscribe
  ): Promise<ResponseCreateVendorSubscribe> {
    return httpService.axios.post(`${apiUrls.VENDOR_SUBSCRIBE.CREATE(id)}`, body);
  }

  deleteVendorSubscribe(id: RequestDeleteVendorSubscribe): Promise<ResponseDeleteVendorSubscribe> {
    return httpService.axios.delete(`${apiUrls.VENDOR_SUBSCRIBE.DELETE(id)}`);
  }
}

export default new VendorSubscribeServices();
