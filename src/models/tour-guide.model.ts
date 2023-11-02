import { PhoneCode } from 'interfaces/common';
import { parsePhoneNumber } from 'helpers/phoneNumberFormat';
import { FormTourGuideValues } from 'app/[locale]/admin/articles/Dialog/AddForm';
import { IMG_URL } from 'constants/apiUrls';
import { DEFAULT_PREFIX_PHONE, Gender, TourGuideInfoStatus, YesOrNoValue } from 'constants/common';
import {
  TourGuide,
  TourGuideDocRequest,
  TourGuideDraft,
} from 'modules/tourGuide/tourGuide.interface';
import moment from 'moment';
import { isEmpty, isUndefined } from 'lodash';

class TourGuideModel {
  static parseInitialValues(item?: TourGuide, itemDraft?: TourGuideDraft) {
    const provinceArr = item?.TourGuideArea?.map((item) => item?.areaId) || [];
    const provinceArrDraft =
      itemDraft?.TourGuideArea?.create?.map((childItem) => childItem?.areaId) || undefined;

    const avatarImg = item?.avatar ? `${IMG_URL}/${item?.avatar}` : undefined;
    const avatarImgDraft = itemDraft?.avatar ? `${IMG_URL}/${itemDraft?.avatar}` : undefined;

    const dob = item?.dob ? moment(item?.dob).format('YYYY-MM-DD') : null;
    const dobDraft = itemDraft?.dob ? moment(itemDraft?.dob).format('YYYY-MM-DD') : null;

    const phoneNumber =
      item?.phone && !isNaN(parseFloat(item?.phone)) ? `0${item?.phone}` : undefined;
    const phoneNumberEmergency =
      item?.phoneEmergency && !isNaN(parseFloat(item?.phoneEmergency))
        ? `0${item?.phoneEmergency}`
        : undefined;

    const phoneNumberDraft =
      itemDraft?.phone && !isNaN(parseFloat(itemDraft?.phone)) ? `0${itemDraft?.phone}` : undefined;
    const phoneNumberEmergencyDraft =
      itemDraft?.phoneEmergency && !isNaN(parseFloat(itemDraft?.phoneEmergency))
        ? `0${itemDraft?.phoneEmergency}`
        : undefined;
    const imgTourGuide = !isEmpty(item?.Gallery?.[0]?.Media)
      ? item?.Gallery?.map(
          (childItem) =>
            childItem.Media?.map((secondItem) => ({
              url: `${IMG_URL}/${secondItem?.url}`,
              content: '',
            }))
        )?.flat()
      : undefined;
    const imgTourGuideDraft = isEmpty(itemDraft?.Gallery?.create?.Media?.createMany?.data)
      ? undefined
      : itemDraft?.Gallery?.create?.Media?.createMany?.data?.map((childItem) => ({
          url: `${IMG_URL}/${childItem?.url}`,
          content: '',
        })) || imgTourGuide;

    const citizenIdCardImage =
      item?.TourGuideDoc?.[0]?.media
        ?.map((el) => ({
          url: `${IMG_URL}/${el?.url}`,
          content: '',
          fileType: el?.type,
        }))
        ?.flat() || [];

    const citizenIdCardImageDraft = !isUndefined(itemDraft?.TourGuideDoc)
      ? itemDraft?.TourGuideDoc?.create?.media?.createMany?.data
          ?.map((el) => ({
            url: `${IMG_URL}/${el?.url}`,
            content: '',
            fileType: el?.type,
          }))
          ?.flat()
      : citizenIdCardImage;

    const result = {
      firstName: item?.firstName || '',
      lastName: item?.lastName || '',
      cid: item?.cid || '',
      description: item?.description || '',
      residenceAccordingToPermanentAddress: item?.residenceAccordingToPermanentAddress || '',
      date_of_birth: dob,
      phone: phoneNumber,
      phoneEmergencyPrefix: item?.phoneEmergencyCode || DEFAULT_PREFIX_PHONE.toString(),
      phoneTourGuidePrefix: item?.phoneCode || DEFAULT_PREFIX_PHONE.toString(),
      currentResidence: item?.currentResidence || '',
      provinceCity: provinceArr,
      nameEmergency: item?.nameEmergency || '',
      phoneEmergency: phoneNumberEmergency,
      relationship: item?.relationShip || '',
      avatar: avatarImg,
      imgTourGuide: imgTourGuide,
      citizenIdCardImage: citizenIdCardImage,
      ratingTourGuide: item?.avgRate || 0,
      isActive: item?.isActive || undefined,
      checkLicense: '',
      bankName: item?.tourGuidePaymentMethod?.[0]?.bankName || '',
      accountNumber: item?.tourGuidePaymentMethod?.[0]?.bankCode || '',
      beneficiaryName: item?.tourGuidePaymentMethod?.[0]?.receiveName || '',
      email: item?.email || '',
      gender: '',
      status: item?.status || TourGuideInfoStatus.PENDING_APPROVAL,
      draft: {
        firstName: itemDraft?.firstName || item?.firstName || '',
        lastName: itemDraft?.lastName || item?.lastName || '',
        cid: itemDraft?.cid || item?.cid || '',
        description: itemDraft?.description || item?.description || '',
        note: itemDraft?.note || undefined,
        residenceAccordingToPermanentAddress:
          itemDraft?.residenceAccordingToPermanentAddress ||
          item?.residenceAccordingToPermanentAddress ||
          '',
        date_of_birth: dobDraft || dob,
        phone: phoneNumberDraft || phoneNumber,
        phoneEmergency: phoneNumberEmergencyDraft || phoneNumberEmergency,
        phoneEmergencyPrefix: itemDraft?.phoneEmergencyCode || item?.phoneEmergencyCode,
        phoneTourGuidePrefix: itemDraft?.phoneCode || item?.phoneCode,
        currentResidence: itemDraft?.currentResidence || item?.currentResidence || '',
        provinceCity: provinceArrDraft || provinceArr,
        nameEmergency: itemDraft?.nameEmergency || item?.nameEmergency || '',
        relationship: itemDraft?.relationShip || item?.relationShip || '',
        avatar: avatarImgDraft || avatarImg,
        imgTourGuide: imgTourGuideDraft,
        citizenIdCardImage: citizenIdCardImageDraft,
        ratingTourGuide: itemDraft?.avgRate || item?.avgRate,
        isActive: itemDraft?.isActive || item?.isActive,
        checkLicense: '',
        bankName:
          itemDraft?.tourGuidePaymentMethod?.create?.bankName ||
          item?.tourGuidePaymentMethod?.[0]?.bankName ||
          '',
        accountNumber:
          itemDraft?.tourGuidePaymentMethod?.create?.bankCode ||
          item?.tourGuidePaymentMethod?.[0]?.bankCode ||
          '',
        beneficiaryName:
          itemDraft?.tourGuidePaymentMethod?.create?.receiveName ||
          item?.tourGuidePaymentMethod?.[0]?.receiveName ||
          '',
        email: itemDraft?.email || item?.email,
        gender: '',
      },
    };

    //! Convert isCertificate
    if (item?.isCertificate === true) {
      result.checkLicense = YesOrNoValue.Yes;
    }
    if (item?.isCertificate === false) {
      result.checkLicense = YesOrNoValue.No;
    }
    if (!itemDraft?.isCertificate) {
      result.draft.checkLicense = result.checkLicense;
    }
    if (itemDraft?.isCertificate === true && itemDraft?.isCertificate) {
      result.draft.checkLicense = YesOrNoValue.Yes;
    }
    if (itemDraft?.isCertificate === false && itemDraft?.isCertificate) {
      result.draft.checkLicense = YesOrNoValue.No;
    }

    //!Convert gender
    if (item?.gender === Gender.MALE) {
      result.gender = YesOrNoValue.Yes;
    }
    if (item?.gender === Gender.FEMALE) {
      result.gender = YesOrNoValue.No;
    }
    if (item?.gender === Gender.OTHER) {
      result.gender = YesOrNoValue.Other;
    }
    if (!itemDraft?.gender) {
      result.draft.gender = result.gender;
    }
    if (itemDraft?.gender && itemDraft?.gender === Gender.MALE) {
      result.draft.gender = YesOrNoValue.Yes;
    }
    if (itemDraft?.gender && itemDraft?.gender === Gender.FEMALE) {
      result.draft.gender = YesOrNoValue.No;
    }
    if (itemDraft?.gender && itemDraft?.gender === Gender.OTHER) {
      result.draft.gender = YesOrNoValue.Other;
    }
    return result as FormTourGuideValues;
  }

  static parseBodyToRequest(
    value: FormTourGuideValues,
    avatar?: string,
    imageTourGuide?: string[],
    citizenIdCardImage?: TourGuideDocRequest[]
  ) {
    const { onlyPhoneFormated } = parsePhoneNumber(value?.phone, value?.phoneTourGuidePrefix);
    const result = {
      firstName: value?.firstName || undefined,
      lastName: value?.lastName || undefined,
      cid: value?.cid || '',
      // destination: undefined,
      description: value?.description,
      avatar: avatar || undefined,
      areaId: 1,
      areas: value?.provinceCity || undefined,
      status: value?.status || TourGuideInfoStatus.VERIFIED,
      phone: onlyPhoneFormated.replace(/ /g, '') || undefined,
      gender: Number(value?.gender) || 0,
      bankCode: value?.accountNumber || undefined,
      bankName: value?.bankName || undefined,
      paymentMethodStatus: 'ACTIVE',
      media: imageTourGuide?.map((item) => ({
        url: item,
        content: 'String',
      })),
      tourGuideDocs: citizenIdCardImage?.map((item) => ({
        url: item?.url,
        content: item?.content,
        fileType: item?.fileType,
      })),
      receiveName: value?.beneficiaryName || undefined,
      residenceAccordingToPermanentAddress:
        value?.residenceAccordingToPermanentAddress || undefined,
      currentResidence: value?.currentResidence,
      nameEmergency: value?.nameEmergency || undefined,
      phoneEmergency: value?.phoneEmergency || undefined,
      relationShip: value?.relationship || '',
      dob: value?.date_of_birth || undefined,
      isActive: value?.isActive || false,
      isCertificate: false,
      email: value?.email || undefined,
      phoneCode: value?.phoneTourGuidePrefix || DEFAULT_PREFIX_PHONE.toString(),
      phoneEmergencyCode: value?.phoneEmergencyPrefix || DEFAULT_PREFIX_PHONE.toString(),
    };
    // Convert isCertificate
    if (value?.checkLicense === YesOrNoValue.Yes) {
      result.isCertificate = true;
    }
    if (value?.checkLicense === YesOrNoValue.No) {
      result.isCertificate = false;
    }

    //Convert
    // return result as RequestCreateTourGuide;
    return result;
  }
}

export default TourGuideModel;
