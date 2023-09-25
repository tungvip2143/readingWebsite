import { FormValuesVendor } from 'app/[locale]/admin/vendor/Components/Content';
import { VendorStatus } from 'constants/common';
import { showError } from 'helpers/toast';
import { Media } from 'interfaces/common';
import { cloneDeep, isEmpty, isString } from 'lodash';
import uploadImageServices from 'modules/uploadImage/upload-image.services';
import { RequestCreateVendor, RequestServing, Vendor } from 'modules/vendor/vendor.interface';
import moment from 'moment';

class VendorModel {
  static parseInitialValues(values?: Vendor) {
    let servings: RequestServing = {};

    values?.VendorServing?.forEach((item) => {
      const { dayOfWeek, start, end } = item;
      if (!servings[dayOfWeek]) {
        servings[dayOfWeek] = [];
      }
      servings[dayOfWeek].push({ start, end });
    });

    const result = {
      name: values?.name || '',
      vendorTypes: values?.VendorTypeRelation.map((item) => item?.type?.id) || [],
      description: values?.description || '',
      media: values?.Gallery?.[0]?.Media?.map((el, index) => ({ ...el, order: index })) || [],
      fullAddress: values?.destination?.fullAddress || '',
      status: VendorStatus.OPEN,
      provinceCode: values?.destination?.provinceCode || '',
      districtCode: values?.destination?.districtCode || '',
      phone: values?.phone || '',
      email: values?.email || '',
      phoneCode: values?.phoneCode || '',
      wardCode: values?.destination?.wardCode || '',
      minPrice: values?.minPrice || 0,
      bookingPrice: values?.bookingPrice || 0,
      maxPrice: values?.maxPrice || 0,
      servings: servings || undefined,
      isVerify: values?.isVerify || false,
      totalSlot: values?.totalSlot || 0,
      dateFromTo: values?.VendorServing,
    };
    return result as FormValuesVendor;
  }

  static parseBodyToRequestAdd(value?: FormValuesVendor, media?: Media[]) {
    const valueServing = cloneDeep(value?.servings);
    if (!isEmpty(valueServing)) {
      for (const key in valueServing) {
        if (valueServing.hasOwnProperty(key)) {
          const events = valueServing[key];
          for (const event of events) {
            event.start = moment(event.start).format(' YYYY-MM-DD HH:mm'); // Chỉ lấy thời gian
            event.end = moment(event.end).format('YYYY-MM-DD HH:mm'); // Chỉ lấy thời gian
          }
        }
      }
    }

    const result = {
      email: value?.email,
      name: value?.name,
      phone: value?.phone?.replace(/^0+/, '') || undefined,
      description: value?.description,
      provinceCode: value?.provinceCode,
      phoneCode: value?.phoneCode,
      districtCode: value?.districtCode,
      wardCode: value?.wardCode,
      media: media || [],
      fullAddress: value?.fullAddress,
      status: value?.status,
      vendorTypes: value?.vendorTypes || undefined,
      bookingPrice: Number(value?.bookingPrice) || 0,
      totalSlot: Number(value?.totalSlot) || undefined,
      minPrice: Number(value?.minPrice) || 0,
      maxPrice: Number(value?.maxPrice) || 0,
      servings: !isEmpty(valueServing) ? valueServing : undefined,
      isVerify: value?.isVerify || false,
    };

    return result as RequestCreateVendor;
  }

  static parseBodyToRequestUpdate(
    value?: FormValuesVendor,
    media?: Media[],
    vendorStatus?: VendorStatus
  ) {
    const valueServing = cloneDeep(value?.servings);
    if (!isEmpty(valueServing)) {
      for (const key in valueServing) {
        if (valueServing.hasOwnProperty(key)) {
          const events = valueServing[key];
          for (const event of events) {
            event.start = moment(event?.start).format('YYYY/MM/DD HH:mm:ss'); // Chỉ lấy thời gian
            event.end = moment(event?.end).format('YYYY/MM/DD HH:mm:ss'); // Chỉ lấy thời gian
          }
        }
      }
    }

    const result = {
      email: value?.email,
      name: value?.name,
      phone: value?.phone?.replace(/^0+/, '') || undefined,
      description: value?.description,
      provinceCode: value?.provinceCode,
      phoneCode: value?.phoneCode,
      districtCode: value?.districtCode,
      wardCode: value?.wardCode,
      media: media || [],
      fullAddress: value?.fullAddress,
      status: vendorStatus,
      vendorTypes: value?.vendorTypes || undefined,
      bookingPrice: Number(value?.bookingPrice) || undefined,
      totalSlot: Number(value?.totalSlot) || undefined,
      minPrice: Number(value?.minPrice) || undefined,
      maxPrice: Number(value?.maxPrice) || undefined,
      servings: !isEmpty(valueServing) ? valueServing : undefined,
      isVerify: value?.isVerify || false,
    };

    return result as RequestCreateVendor;
  }

  //* Upload file to get Link
  //* url as File
  //* If Image is String -> ignore
  //* If Image is File -> upload
  static async uploadMedia(mediaArg: Media[]): Promise<Media[]> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const mediaNotUploaded = mediaArg?.filter((el) => !isString(el.url));

          let mediaNotUploadedParsed: Media[] = [];

          if (mediaNotUploaded.length > 0) {
            const formData = new FormData();
            mediaNotUploaded?.forEach((el: Media) => {
              const { url } = el;
              formData.append(`files`, url || '');
            });
            const responseImages = await uploadImageServices.uploadMultipleImage(formData);
            mediaNotUploadedParsed = mediaNotUploaded.map((el, index) => ({
              ...el,
              url: responseImages?.data?.data?.data[index]?.uri || '',
            }));
          }

          const result = mediaArg.map((m) => {
            const found = mediaNotUploadedParsed.find((mediaNotUploaded) => {
              return mediaNotUploaded.order === m.order;
            });

            if (!!found) {
              return found;
            }

            return m;
          });
          resolve(result.map((el) => ({ url: el.url, content: el.content })));
        } catch (error) {
          showError(error);
          reject(error);
        }
      })();
    });
  }
}

export default VendorModel;
