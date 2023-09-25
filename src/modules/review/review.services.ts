import httpService from 'services/httpService';
import {
  RequestGetDetailReview,
  ResponseGetDetailReview,
  RequestGetListReview,
  ResponseGetListReview,
  RequestDeleteReview,
  ResponseDeleteReview,
  RequestUpdateReview,
  ResponseUpdateReview,
  RequestCreateReview,
  ResponseCreateReview,
} from './review.interface';
import apiUrls from 'constants/apiUrls';

class ReviewServices {
  getListReview(body: RequestGetListReview): Promise<ResponseGetListReview> {
    return httpService.axios.get(
      `https://dummyjson.com/products?skip=${body.page}&limit=${body.perPage}`
    );
  }

  getDetailReview(id: RequestGetDetailReview): Promise<ResponseGetDetailReview> {
    return httpService.axios.get(`https://dummyjson.com/products/${id}`);
  }

  createTour(idCustomer: number, body: RequestCreateReview): Promise<ResponseCreateReview> {
    return httpService.axios.post(`${apiUrls.REVIEW}/${idCustomer}`, body);
  }

  updateReview({ id, body }: RequestUpdateReview): Promise<ResponseUpdateReview> {
    return httpService.axios.patch(`https://dummyjson.com/products/${id}`, body);
  }

  deleteReview({ id }: RequestDeleteReview): Promise<ResponseDeleteReview> {
    return httpService.axios.delete(`https://dummyjson.com/products/${id}`);
  }
}

export default new ReviewServices();
