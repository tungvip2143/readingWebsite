import { FormPlaceFilterValues } from 'components/Client/PlacesPage/PlacesContainer';
import { RequestGetListToursByCategory } from 'modules/toursByCategory/toursByCategory.interface';

class TourClientModel {
  static parseInitialValues(item?: RequestGetListToursByCategory) {
    const result = {
      provinceCode: item?.provinceCode?.toString() || '',
      textSearch: item?.textSearch || '',
      maxPrice: item?.maxPrice || 0,
      minPrice: item?.minPrice || 0,
      rating: item?.rating || undefined,
      type: item?.attributes?.split(',') || [],
    };
    return result;
  }

  static parseBodyToRequest(value: FormPlaceFilterValues, hasCategory?: boolean) {
    const result = {
      provinceCode: value?.provinceCode || undefined,
      textSearch: value?.textSearch || '',
      maxPrice: !hasCategory ? value?.maxPrice || 0 : undefined,
      minPrice: !hasCategory ? value?.minPrice || 0 : undefined,
      priceForm: hasCategory ? value?.minPrice || 0 : undefined,
      priceTo: hasCategory ? value?.maxPrice || 0 : undefined,
      rating: value?.rating || undefined,
      attributes: value?.type?.join(',') || '',
    };

    return result;
  }
}

export default TourClientModel;
