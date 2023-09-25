import { FormValuesTour } from 'app/[locale]/admin/tour/Components/Content';
import { showError } from 'helpers/toast';
import { Media } from 'interfaces/common';
import { cloneDeep, isString } from 'lodash';
import { RequestCreateTour } from 'modules/tour/tour.interface';
import uploadImageServices from 'modules/uploadImage/upload-image.services';

class TourModel {
  static parseBodyToRequest(body: FormValuesTour): RequestCreateTour {
    const nextBody = cloneDeep(body);
    const checkedCategory: number[] = [];

    Object.entries(nextBody).forEach(([key, value]: any) => {
      if (key.includes('category') && value) {
        const id = key.split('_')[1];
        checkedCategory.push(+id);
      }
      if (key.includes('category')) {
        delete nextBody[key];
      }
    });

    nextBody.language = nextBody?.language?.map((elm) => elm.value);
    nextBody.priceForAdult = +(nextBody?.priceForAdult || 0);
    nextBody.priceForChildren = +(nextBody?.priceForChildren || 0);
    nextBody.defaultNumberCustomer = +(nextBody?.defaultNumberCustomer || 0);
    nextBody.areaId = +(nextBody?.areaId || 0);

    nextBody.fixCost = +(nextBody?.fixCost || 0);
    nextBody.maxCustomer = +(nextBody?.maxCustomer || 0);
    nextBody.minCustomer = +(nextBody?.minCustomer || 1);
    nextBody.numberOfDays = +(nextBody?.numberOfDays || 0);
    nextBody.numberOfNights = nextBody?.numberOfDays - 1;
    nextBody.categories = checkedCategory;
    nextBody.allowCancelTime = +(nextBody?.allowCancelTime || 0);

    return nextBody;
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
              formData.append(`files`, url);
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
          resolve(result.map((el) => ({ url: el.url, content: el.content, fileType: el.type })));
        } catch (error) {
          showError(error);
          reject(error);
        }
      })();
    });
  }
}

export default TourModel;
