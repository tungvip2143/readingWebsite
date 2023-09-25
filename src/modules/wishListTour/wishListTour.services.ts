import httpService from 'services/httpService';
import {
  RequestAddWishListTour,
  RequestGetListWishListTour,
  RequestRemoveWishListTour,
  ResponseAddWishListTour,
  ResponseGetListWishListTour,
  ResponseRemoveWishListTour,
} from './wishListTour.interface';
import apiUrls from 'constants/apiUrls';
import queryString from 'query-string';

class WishListTourServices {
  addWishListTour(body: RequestAddWishListTour): Promise<ResponseAddWishListTour> {
    const { tourId } = body;
    return httpService.axios.post(`${apiUrls.TOUR.WISH_LIST_TOUR}/${tourId}/wish`, body);
  }
  removeWishListTour(body: RequestRemoveWishListTour): Promise<ResponseRemoveWishListTour> {
    const { tourId } = body;
    return httpService.axios.delete(`${apiUrls.TOUR.WISH_LIST_TOUR}/${tourId}/unwish`);
  }
  getListWishListTour(param: RequestGetListWishListTour): Promise<ResponseGetListWishListTour> {
    return httpService.axios.get(
      `${apiUrls.TOUR.WISH_LIST_TOUR}/list?${queryString.stringify(param, {
        skipEmptyString: true,
      })}`
    );
  }
}

export default new WishListTourServices();
