import httpService from 'services/httpService';
import {
  ResponseGetListProvinceDetail,
  ResponseGetListProvince,
  ResponseGetListDistrict,
  ResponseGetListWards,
} from './province.interface';
import apiUrls from 'constants/apiUrls';
import pageUrls from 'constants/pageUrls';

class ProvinceServices {
  getListProvince(): Promise<ResponseGetListProvince> {
    return httpService.axios.get(`${apiUrls.PROVINCE.GET_LIST}`);
  }
  getListProvinceDetail(): Promise<ResponseGetListProvinceDetail> {
    return httpService.axios.get(`${apiUrls.PROVINCE.GET_LIST_PROVINCE}`);
  }
  getListDistrict(provinceCode: string): Promise<ResponseGetListDistrict> {
    return httpService.axios.get(`${apiUrls.DISTRICT.GET_LIST(provinceCode)}`);
  }
  getListWards(districtCode: string): Promise<ResponseGetListWards> {
    return httpService.axios.get(`${apiUrls.WARDS.GET_LIST(districtCode)}`);
  }
}

export default new ProvinceServices();
