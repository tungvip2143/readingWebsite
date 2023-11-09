import { FormVerifyProfileBasic } from 'components/Client/Components/ProfileBasic/PersonalInformation';
import { IMG_URL } from 'constants/apiUrls';
import { DEFAULT_PREFIX_PHONE, Gender, YesOrNoValue } from 'constants/common';
import { TourGuide } from 'modules/tourGuide/article.interface';
import moment from 'moment';

class ProfileBasicdModel {
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

    const result = {
      firstName: values?.firstName || '',
      lastName: values?.lastName || '',
      gender: '',
      dateOfBirth: dateOfBirth,
      email: values?.email || '',
      phone: phoneNumber,
      phoneCode: values?.phoneCode || DEFAULT_PREFIX_PHONE.toString(),
      cid: values?.cid || '',
      bio: values?.description || '',
      provinceCity: values?.TourGuideArea?.map((items) => items?.areaId) || undefined,
      residenceAccordingToPermanentAddress: values?.residenceAccordingToPermanentAddress || '',
      currentResidence: values?.currentResidence || '',
      filesUpload: imgTourGuide,
      avatar: avatarImg,
    };

    //Convert isCertificate

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
    return result as FormVerifyProfileBasic;
  }
}

export default ProfileBasicdModel;
