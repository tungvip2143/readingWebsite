import httpService from 'services/httpService';
import {
  RequestGetBookListPaging,
  ResponseGetBookList,
} from './book.interface';

class BookService {
  getBookListPaging(body: RequestGetBookListPaging): Promise<ResponseGetBookList> {
    return httpService.axios.get(
      `https://dummyjson.com/products?skip=${body.page}&limit=${body.limit}`
    );
  }
}

export default new BookService();
