import { GetListMyTourBooking } from 'modules/myTourBooking/myTourBooking.interface';
import moment from 'moment';

class MyBookingTourModel {
  // static parseInitialValues(item?: RequestGetListVendor) {
  //   const result = {
  //     provinceCode: item?.provinceCode || '',
  //     textSearch: item?.textSearch || '',
  //     sortField: item?.sortField || '',
  //     maxPrice: item?.maxPrice || 0,
  //     minPrice: item?.minPrice || 0,
  //     rating: item?.rating || undefined,
  //     type: item?.type?.split(',') || [],
  //   };
  //   return result;
  // }
  static parseBodyToRequest(value: GetListMyTourBooking) {
    // const timeBooking = value?.time ? moment(value?.time).format('YYYY-MM-DD') : undefined;
    const timeFromBooking = value?.from ? moment(value?.from).format('YYYY-MM-DD') : undefined;
    const timeToBooking = value?.to ? moment(value?.to).format('YYYY-MM-DD') : undefined;
    const result = {
      page: value.page,
      perPage: value.perPage,
      textSearch: value?.textSearch,
      status: value?.status,
      // time: timeFromBooking,
      from: timeFromBooking,
      to: timeToBooking,
    };

    return result;
  }
}

export default MyBookingTourModel;
