import { FormVerifyProfile } from 'components/Client/Components/Profile/PersonalInformation';
import { IMG_URL } from 'constants/apiUrls';
import { DEFAULT_PREFIX_PHONE, Gender, YesOrNoValue } from 'constants/common';
import { parsePhoneNumber } from 'helpers/phoneNumberFormat';
import { showError } from 'helpers/toast';
import { Media } from 'interfaces/common';
import { isString } from 'lodash';
import { BodyUpdateProfileTourGuide } from 'modules/profileLocalFriend/profileLocalFriend.interface';
import { TourGuide, TourGuideDocRequest } from 'modules/tourGuide/tourGuide.interface';
import uploadImageServices from 'modules/uploadImage/upload-image.services';
import moment from 'moment';

class ProfileLocalFriendModel {
  static parseInitialValues(values?: TourGuide) {
    const dateOfBirth = values?.dob ? moment(values?.dob).format('YYYY-MM-DD') : undefined;
    const avatarImg = values?.avatar ? `${IMG_URL}/${values?.avatar}` : undefined;
    const imgTourGuide =
      values?.Gallery?.map(
        (childItem) =>
          childItem?.Media?.map((secondItem) => ({
            url: `${IMG_URL}/${secondItem?.url}`,
            content: '',
            type: secondItem?.type,
          }))
      ).flat() || undefined;
    const phoneNumber =
      values?.phone && !isNaN(parseFloat(values?.phone)) ? `0${values?.phone}` : undefined;
    const phoneNumberEmergency =
      values?.phoneEmergency && !isNaN(parseFloat(values?.phoneEmergency))
        ? `0${values?.phoneEmergency}`
        : undefined;
    const citizenIdCardImage =
      values?.TourGuideDoc?.[0]?.media
        ?.map((el) => ({
          url: `${IMG_URL}/${el?.url}`,
          content: '',
          fileType: el?.type,
        }))
        ?.flat() || [];

    const result = {
      citizenIdCardImage: citizenIdCardImage,
      firstName: values?.firstName || '',
      lastName: values?.lastName || '',
      gender: '',
      dateOfBirth: dateOfBirth,
      email: values?.email || '',
      phone: phoneNumber,
      phoneEmergencyCode: values?.phoneEmergencyCode || DEFAULT_PREFIX_PHONE.toString(),
      phoneCode: values?.phoneCode || DEFAULT_PREFIX_PHONE.toString(),
      phoneEmergency: phoneNumberEmergency,
      cid: values?.cid || '',
      nameEmergency: values?.nameEmergency || '',
      relationship: values?.relationShip || '',
      bio: values?.description || '',
      provinceCity: values?.TourGuideArea?.map((items) => items?.areaId) || undefined,
      residenceAccordingToPermanentAddress: values?.residenceAccordingToPermanentAddress || '',
      currentResidence: values?.currentResidence || '',
      checkLicense: '',
      filesUpload: imgTourGuide,
      avatar: avatarImg,
      bankName: values?.tourGuidePaymentMethod?.[0]?.bankName || '',
      accountNumber: values?.tourGuidePaymentMethod?.[0]?.bankCode || '',
      beneficiaryName: values?.tourGuidePaymentMethod?.[0]?.receiveName || '',
      note: values?.note || '',
    };

    //Convert isCertificate
    if (values?.isCertificate === true) {
      result.checkLicense = YesOrNoValue.Yes;
    }
    if (values?.isCertificate === false) {
      result.checkLicense = YesOrNoValue.No;
    }
    //Convert gender
    if (values?.gender === Gender.MALE) {
      result.gender = YesOrNoValue.Yes;
    }
    if (values?.gender === Gender.FEMALE) {
      result.gender = YesOrNoValue.No;
    }
    if (values?.gender === Gender.OTHER) {
      result.gender = YesOrNoValue.Other;
    }
    return result as FormVerifyProfile;
  }

  static parseBodyToRequest(
    value: FormVerifyProfile,
    avatar?: string,
    imageTourGuide?: string[],
    citizenIdCardImage?: TourGuideDocRequest[]
  ) {
    const { onlyPhoneFormated } = parsePhoneNumber(value?.phone, value?.phoneCode);
    const result = {
      lastName: value?.lastName,
      firstName: value?.firstName,
      description: value?.bio,
      residenceAccordingToPermanentAddress: value?.residenceAccordingToPermanentAddress,
      currentResidence: value?.currentResidence,
      nameEmergency: value?.nameEmergency,
      phoneEmergency: Number(value?.phoneEmergency)?.toString() || undefined,
      phoneEmergencyCode: value?.phoneEmergencyCode,
      relationShip: value?.relationShip,
      email: value?.email,
      cid: value?.cid,
      avatar: avatar,
      areas: value?.provinceCity || undefined,
      gender: Number(value?.gender) || 0,
      media: imageTourGuide?.map((item) => ({
        url: item,
        content: 'String',
      })),
      phone: onlyPhoneFormated.replace(/ /g, '') || undefined,
      dob: value?.dateOfBirth || undefined,
      isCertificate: false,
      bankCode: value?.accountNumber || '',
      bankName: value?.bankName || '',
      paymentMethodStatus: 'ACTIVE',
      receiveName: value?.beneficiaryName || '',
      phoneCode: value?.phoneCode || DEFAULT_PREFIX_PHONE.toString(),
      tourGuideDocs: citizenIdCardImage?.map((item) => ({
        url: item?.url,
        content: item?.content,
        fileType: item?.fileType,
      })),
    };

    //Convert
    if (value?.checkLicense === YesOrNoValue.Yes) {
      result.isCertificate = true;
    }
    if (value?.checkLicense === YesOrNoValue.No) {
      result.isCertificate = false;
    }
    return result as BodyUpdateProfileTourGuide;
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

export default ProfileLocalFriendModel;
