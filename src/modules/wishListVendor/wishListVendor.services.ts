import httpService from 'services/httpService';
import {
  RequestAddWishListVendor,
  RequestGetListWishListVendor,
  RequestRemoveWishListVendor,
  ResponseAddWishListVendor,
  ResponseRemoveWishListVendor,
  ResponseGetListWishListVendor,
} from './wishListVendor.interface';
import apiUrls from 'constants/apiUrls';
import queryString from 'query-string';

class WishListVendorServices {
  getListWishListVendor(
    body: RequestGetListWishListVendor
  ): Promise<ResponseGetListWishListVendor> {
    return httpService.axios.get(
      `${apiUrls.VENDOR.WISH_LIST_VENDOR}/list?${queryString.stringify(body, {
        skipEmptyString: true,
      })}`
    );
  }
  addWishListVendor(body: RequestAddWishListVendor): Promise<ResponseAddWishListVendor> {
    const { vendorId } = body;
    return httpService.axios.post(`${apiUrls.VENDOR.WISH_LIST_VENDOR}/${vendorId}/wish`, body);
  }
  removeWishListVendor(body: RequestRemoveWishListVendor): Promise<ResponseRemoveWishListVendor> {
    const { vendorId } = body;
    return httpService.axios.delete(`${apiUrls.VENDOR.WISH_LIST_VENDOR}/${vendorId}/unwish`);
  }
}

export default new WishListVendorServices();
