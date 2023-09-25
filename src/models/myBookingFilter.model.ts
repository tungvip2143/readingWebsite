import { RequestGetListVendor } from 'modules/vendor/vendor.interface';
import { FormFilterMyBooking } from 'components/Client/MyBookingVendorPage/MyBookingContainer';

class MyBookingFilterModel {
  static parseInitialValues(item?: RequestGetListVendor) {
    const result = {
      provinceCode: item?.provinceCode || '',
      textSearch: item?.textSearch || '',
      sortField: item?.sortField || '',
      maxPrice: item?.maxPrice || 0,
      minPrice: item?.minPrice || 0,
      rating: item?.rating || undefined,
      type: item?.type?.split(',') || [],
    };
    return result;
  }
  static parseBodyToRequest(value: FormFilterMyBooking) {
    const result = {
      provinceCode: value?.provinceCode || '',
      textSearch: value?.textSearch || '',
      sortField: value?.sortField || '',
      maxPrice: value?.maxPrice || 0,
      minPrice: value?.minPrice || 0,
      rating: value?.rating || undefined,
      type: value?.type?.join(',') || '',
    };

    return result;
  }
}

export default MyBookingFilterModel;
