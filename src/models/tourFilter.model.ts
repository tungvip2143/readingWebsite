import { FormFilterValueTour } from 'app/[locale]/admin/tour/page';
import { FormPlaceFilterValues } from 'components/Client/PlacesPage/PlacesContainer';
import { Order } from 'interfaces/common';
import { isObject, isString } from 'lodash';
import { RequestGetListTour } from 'modules/tour/tour.interface';
import { RequestGetListToursByCategory } from 'modules/toursByCategory/toursByCategory.interface';

class TourFilterModel {
  static parseInitialValues(item?: RequestGetListTour) {
    const result = {
      page: item?.page || 1,
      perPage: item?.perPage || 10,
      sortField: item?.sortField || 'createdAt',
      sortOrder: item?.sortOrder || Order.desc,
      priceForm: item?.priceForm || undefined,
      priceTo: item?.priceTo || undefined,
      textSearch: item?.textSearch || undefined,
      categories: item?.categories || [],
      status: item?.status || undefined,
      rating: item?.rate || undefined,
      attributes: item?.attributes || [],
      provinceCode: item?.provinceCode || undefined,
    };
    return result;
  }

  static parseBodyToRequest(value: FormFilterValueTour) {
    const valueProvince: () => string = () => {
      if (!value?.provinceCode) {
        return undefined;
      }
      if (isString(value?.provinceCode)) {
        return value?.provinceCode;
      }
      if (isObject(value?.provinceCode)) {
        return value?.provinceCode?.value;
      }
    };
    const result = {
      page: value?.page || 1,
      perPage: value?.perPage || 10,
      sortField: value?.sortField || undefined,
      sortOrder: value?.sortOrder || undefined,
      textSearch: value?.textSearch || undefined,
      categories: value?.categories || undefined,
      status: value?.status || undefined,
      provinceCode: valueProvince(),
    };

    return result as RequestGetListTour;
  }
}

export default TourFilterModel;
