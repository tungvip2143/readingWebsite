import {
  FilterStatusTourBooking,
  BannerStatus,
  BannerType,
  Language,
  TourGuideInfoStatus,
  TourStatus,
  UserStatus,
  Gender,
} from 'constants/common';
import { Order, SelectOption } from 'interfaces/common';
import { useTranslations } from 'next-intl';
import React, { useMemo } from 'react';

const useConstants = () => {
  const t = useTranslations();

  const optionsActiveOrInactive = useMemo(() => {
    return [
      { label: t('Common.ok'), value: 1 },
      { label: t('Common.cancel'), value: 2 },
    ];
  }, [t]);

  const optionsYesOrNo = useMemo(() => {
    return [
      { label: t('Common.yes'), value: 1 },
      { label: t('Common.no'), value: 2 },
    ];
  }, [t]);

  const optionsFemaleOrMale = useMemo(() => {
    return [
      { label: t('Common.female'), value: 2 },
      { label: t('Common.male'), value: 1 },
      { label: t('Common.other'), value: 3 },
    ];
  }, [t]);

  const optionsChangeLanguage = useMemo(() => {
    return [
      { label: t('Common.vietnamese'), value: Language.VIETNAMESE },
      { label: t('Common.english'), value: Language.ENGLISH },
    ];
  }, [t]);

  const optionsCity = useMemo(() => {
    return [
      { label: t('Tour.chooseProvince'), value: 0 },
      { label: 'Hà Nội', value: 1 },
      { label: 'Nha Trang', value: 2 },
    ];
  }, [t]);

  const optionsBannerType = useMemo(() => {
    return [
      { label: 'General', value: BannerType.GENERAL },
      { label: 'Home banner page', value: BannerType.HOME_BANNER_PAGE },
    ];
  }, [t]);

  const optionsActiveOrDeActive = useMemo(() => {
    return [
      {
        label: t('Common.active'),
        value: 1,
      },
      {
        label: t('Common.deactive'),
        value: 2,
      },
    ];
  }, [t]);

  const optionsInfoStatusTourGuide = useMemo(() => {
    return [
      {
        label: '___',
        value: TourGuideInfoStatus.CLEAR,
      },
      {
        label: t('Common.verified'),
        value: TourGuideInfoStatus.VERIFIED,
      },
      {
        label: t('Common.disapprove'),
        value: TourGuideInfoStatus.DISAPPROVAL,
      },
      {
        label: t('Common.pendingApprove'),
        value: TourGuideInfoStatus.PENDING_APPROVAL,
      },
      {
        label: t('Common.new'),
        value: TourGuideInfoStatus.NEW,
      },
    ];
  }, [t]);
  // const optionLocation: SelectOption[] = useMemo(
  //   () => [
  //     { label: 'Hà Nội', value: 'ha-noi' },
  //     { label: 'Đà Nẵng', value: 'da-nang' },
  //     { label: 'Hồ Chí Minh', value: 'ho-chi-minh' },
  //   ],
  //   [t]
  // );

  const optionSortBy = useMemo(
    () => [
      { label: 'Hot', value: 'hot' },
      { label: 'Newest', value: 'createAt' },
      { label: 'Popular', value: 'popular' },
    ],
    [t]
  );

  // const optionLocation: SelectOption[] = useMemo(
  //   () => [
  //     { label: 'Ha Noi', value: 1 },
  //     { label: 'Da Nang', value: 2 },
  //     { label: 'Ho Chi Minh', value: 3 },
  //   ],
  //   [t]
  // );

  const optionsSortCreatedAt = useMemo(
    () => [
      {
        label: t('Common.newest'),
        value: Order.desc,
      },
      {
        label: t('Common.oldest'),
        value: Order.asc,
      },
    ],
    [t]
  );

  const optionsTourStatus = useMemo(
    () => [
      { label: t('Tour.publish'), value: TourStatus.PUBLISH },
      { label: t('Tour.draft'), value: TourStatus.DRAFT },
    ],
    [t]
  );

  const optionsCustomerStatus = useMemo(
    () => [
      { label: t('Customer.active'), value: UserStatus.ACTIVE },
      { label: t('Customer.banner'), value: UserStatus.BANNED },
    ],
    [t]
  );

  const optionPredixNumberPhone = useMemo(() => [{ label: '+84', value: '+84' }], [t]);

  const optionsHasLicenseOrNot = useMemo(() => {
    return [
      { label: t('Profile.hasLicense'), value: 'true' },
      { label: t('Profile.notHaveLicense'), value: 'false' },
    ];
  }, [t]);

  const optionsStatusTourBooking = useMemo(() => {
    return [
      {
        label: t('TourBooking.new'),
        value: FilterStatusTourBooking.NEW,
      },
      { label: t('TourBooking.applied'), value: FilterStatusTourBooking.APPLIED },
      { label: t('TourBooking.picked'), value: FilterStatusTourBooking.MATCHED },
      { label: t('TourBooking.confirmed'), value: FilterStatusTourBooking.PAYMENT_SUCCESS },
      { label: t('TourBooking.expiredPayment'), value: FilterStatusTourBooking.EXPIRED_PAYMENT },
      {
        label: t('TourBooking.customerCancelled'),
        value: FilterStatusTourBooking.CUSTOMER_CANCELED,
      },
      { label: t('TourBooking.hostCancelled'), value: FilterStatusTourBooking.TOUR_GUIDE_CANCELED },
      { label: t('TourBooking.successfully'), value: FilterStatusTourBooking.SUCCESSFULLY },
    ];
  }, [t]);

  const optionsGender = useMemo(() => {
    return [
      { label: t('Common.female'), value: Gender.FEMALE },
      { label: t('Common.male'), value: Gender.MALE },
      { label: t('Common.other'), value: Gender.OTHER },
    ];
  }, [t]);

  return {
    optionsActiveOrInactive,
    optionsYesOrNo,
    optionsFemaleOrMale,
    optionsChangeLanguage,
    optionsCity,
    optionsBannerType,
    // optionLocation,
    optionSortBy,
    optionsActiveOrDeActive,
    optionsSortCreatedAt,
    optionsTourStatus,
    optionPredixNumberPhone,
    optionsInfoStatusTourGuide,
    optionsCustomerStatus,
    optionsHasLicenseOrNot,
    optionsStatusTourBooking,
    optionsGender,
  };
};

export default useConstants;
