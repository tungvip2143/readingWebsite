import { FormFilterTourBooking } from 'app/[locale]/local-friend/booking-tour/page';
import { FilterStatusTourBooking } from 'constants/common';
import { Order } from 'interfaces/common';
import { GetListBookingTour } from 'modules/bookingTour/bookingTour.interface';

class TourBookingModel {
  static parseBodyToSearch(item?: FormFilterTourBooking): GetListBookingTour {
    const result = {
      page: item?.page || 1,
      perPage: item?.perPage || 10,
      areaId: Number(item?.provinceCode || '') || undefined,
      textSearch: item?.textSearch || '',
      priceFrom: item?.maxPrice || undefined,
      priceTo: item?.minPrice || undefined,
      rate: item?.rating || undefined,
      attributes: item?.type?.toString() || '',
      tab: item?.tab || undefined,
      sortField: item?.sortField || 'createdAt',
      sortOrder: item?.sortOrder || Order.desc,
      from: item?.from || undefined,
      to: item?.to || undefined,
    };

    return result;
  }
}

export default TourBookingModel;
