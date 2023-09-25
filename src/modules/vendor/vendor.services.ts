import httpService from 'services/httpService';
import {
  RequestGetListVendor,
  ResponseGetListVendor,
  RequestGetDetailVendor,
  ResponseGetDetailVendor,
  RequestCreateVendor,
  ResponseCreateVendor,
  RequestDeleteVendor,
  ResponseDeleteVendor,
  RequestUpdateVendor,
  ResponseUpdateVendor,
} from './vendor.interface';
import apiUrls from 'constants/apiUrls';
import queryString from 'query-string';

class VendorServices {
  getListVendor(body: RequestGetListVendor): Promise<ResponseGetListVendor> {
    return httpService.axios.get(
      `${apiUrls.VENDOR.GET_LIST}?${queryString.stringify(body, {
        skipEmptyString: true,
      })}`
    );
  }

  getListVendorPublic(body: RequestGetListVendor): Promise<ResponseGetListVendor> {
    return httpService.axios.get(
      `${apiUrls.VENDOR_PUBLIC}?${queryString.stringify(body, {
        skipEmptyString: true,
      })}`
    );
  }

  getDetailVendor(id: RequestGetDetailVendor): Promise<ResponseGetDetailVendor> {
    return httpService.axios.get(`${apiUrls.VENDOR.GET_LIST}/${id}`);
  }

  getDetailVendorPublic(id: RequestGetDetailVendor): Promise<ResponseGetDetailVendor> {
    return httpService.axios.get(`${apiUrls.VENDOR_PUBLIC}/${id}`);
  }

  createVendor(body: RequestCreateVendor): Promise<ResponseCreateVendor> {
    return httpService.axios.post(`${apiUrls.VENDOR.GET_LIST}`, body);
  }

  updateVendor({ id, body }: RequestUpdateVendor): Promise<ResponseUpdateVendor> {
    return httpService.axios.patch(`${apiUrls.VENDOR.UPDATE_VENDOR(id)}`, body);
  }

  deleteVendor(id: RequestDeleteVendor): Promise<ResponseDeleteVendor> {
    return httpService.axios.delete(`${apiUrls.VENDOR.GET_LIST}/${id}`);
  }
}

export default new VendorServices();
