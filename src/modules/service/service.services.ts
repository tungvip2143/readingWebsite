import httpService from 'services/httpService';
import {
  RequestGetDetailService,
  ResponseGetDetailService,
  RequestGetListService,
  ResponseGetListService,
  RequestDeleteService,
  ResponseDeleteService,
  RequestUpdateService,
  ResponseUpdateService,
  RequestCreateService,
  ResponseCreateService,
} from './service.interface';

class Services {
  getListService(body: RequestGetListService): Promise<ResponseGetListService> {
    return httpService.axios.get(
      `https://dummyjson.com/products?skip=${body.page}&limit=${body.perPage}`
    );
  }

  getDetailService(id: RequestGetDetailService): Promise<ResponseGetDetailService> {
    return httpService.axios.get(`https://dummyjson.com/products/${id}`);
  }

  createService(body: RequestCreateService): Promise<ResponseCreateService> {
    return httpService.axios.post(`https://dummyjson.com/products`, body);
  }

  updateService(body: RequestUpdateService): Promise<ResponseUpdateService> {
    const { id, ...restBody } = body;
    return httpService.axios.patch(`https://dummyjson.com/products/${id}`, restBody);
  }

  deleteService({ id }: RequestDeleteService): Promise<ResponseDeleteService> {
    return httpService.axios.delete(`https://dummyjson.com/products/${id}`);
  }
}

export default new Services();
