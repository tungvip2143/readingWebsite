import apiUrls from "constants/apiUrls";
import httpService from "services/httpService";
import { ResponseGetListTypeVendor } from "./vendorType.interface";

class vendorTypeServices {
    getListTypeVendor(): Promise<ResponseGetListTypeVendor> {
      return httpService.axios.get(`${apiUrls.LIST_VENDOR_TYPE.GET_LIST}`);
    }
}
export default new vendorTypeServices();