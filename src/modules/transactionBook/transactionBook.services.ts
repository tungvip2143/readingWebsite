import httpService from 'services/httpService';
import {
  RequestGetDetailTransactionBook,
  ResponseGetDetailTransactionBook,
  RequestGetListTransactionBook,
  ResponseGetListTransactionBook,
  RequestCreateUrlPaymentTour,
  ResponseCreateUrlPaymentTour,
  RequestCreateUrlPaymentVendor,
  ResponseCreateUrlPaymentVendor,
  RequestPaymentTour,
  ResponsePaymentTour,
  RequestPaymentVendor,
  ResponsePaymentVendor,
} from './transactionBook.interface';
import apiUrls from 'constants/apiUrls';

class TransactionBookServices {
  getListTransactionBook(
    body: RequestGetListTransactionBook
  ): Promise<ResponseGetListTransactionBook> {
    return httpService.axios.get(
      `https://dummyjson.com/products?skip=${body.page}&limit=${body.perPage}`
    );
  }

  getDetailTransactionBook(
    id: RequestGetDetailTransactionBook
  ): Promise<ResponseGetDetailTransactionBook> {
    return httpService.axios.get(`https://dummyjson.com/products/${id}`);
  }

  createUrlPaymentTour({
    tourBookingId,
    returnUrl,
  }: RequestCreateUrlPaymentTour): Promise<ResponseCreateUrlPaymentTour> {
    return httpService.axios.post(
      `${apiUrls.TRANSACTION_BOOK.TOUR}/${tourBookingId}/create-url-payment`,
      { returnUrl: returnUrl }
    );
  }

  paymentTour({ tourBookingId, vnPayParam }: RequestPaymentTour): Promise<ResponsePaymentTour> {
    return httpService.axios.patch(`${apiUrls.TRANSACTION_BOOK.TOUR}/${tourBookingId}/payment`, {
      vnPayParam: vnPayParam,
    });
  }

  createUrlPaymentVendor({
    vendorBookingId,
    returnUrl,
  }: RequestCreateUrlPaymentVendor): Promise<ResponseCreateUrlPaymentVendor> {
    return httpService.axios.post(
      `${apiUrls.TRANSACTION_BOOK.VENDOR}/${vendorBookingId}/create-url-payment`,
      { returnUrl: returnUrl }
    );
  }

  paymentVendor({
    vendorBookingId,
    vnPayParam,
  }: RequestPaymentVendor): Promise<ResponsePaymentVendor> {
    return httpService.axios.patch(`${apiUrls.TRANSACTION_BOOK.VENDOR}/${vendorBookingId}/payment`, {
      vnPayParam: vnPayParam,
    });
  }
}

export default new TransactionBookServices();
