import { FormValuesHotDeal } from 'app/[locale]/admin/hot-deal/Components/CreateHotDeal/Content/Content';
import { IMG_URL } from 'constants/apiUrls';
import { BannerStatus } from 'constants/common';
import { HotDeal } from 'modules/hotDeal/hotDeal.interface';

class HotDealrModel {
  static parseInitialValues(item?: HotDeal) {
    const bannerImage = item ? `${IMG_URL}/${item?.bannerUrl}` : undefined;
    const result = {
      name: item?.name || '',
      bannerType: item?.type || '',
      bannerId: item?.bannerId || '',
      description: item?.description || '',
      bannerUrl: bannerImage,
      from: item?.from || '',
      to: item?.to || '',
      deepLinkApp: item?.deepLinkApp || '',
      webLink: item?.webLink || '',
      status: item?.status || undefined,
    };
    return result as FormValuesHotDeal;
  }
  static parseBodyToRequest(value: FormValuesHotDeal, bannerUrl?: string) {
    const result = {
      name: value?.name,
      bannerUrl: bannerUrl,
      description: value?.description,
      status: value?.status || BannerStatus.DRAFT,
      type: value?.bannerType,
      webLink: value?.webLink,
      deepLinkApp: value?.deepLinkApp,
      bannerId: value?.bannerId,
      from: value?.from,
      to: value?.to,
    };

    return result;
  }
}

export default HotDealrModel;
