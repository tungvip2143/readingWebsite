import queryString from 'query-string';
import { isNumber, isString } from 'lodash';
import { languages } from 'i18nOptions';
import { IMAGE_REGEX, PaymentStatus, TourGuideStatus } from 'constants/common';
import moment from 'moment';
import dayjs from 'dayjs';
import { PhoneCode } from 'interfaces/common';

export const localStorageFunc: Storage | undefined =
  typeof window !== 'undefined' ? window.localStorage : undefined;

export const parseQueryString = () => {
  const search = queryString.parse(window.location.search);
  return { search };
};

export const fileToString = (file: string | File) => {
  if (isString(file)) {
    return file;
  }

  return URL.createObjectURL(file);
};

export const removeLangFromPathname = (pathname?: string) => {
  let nextPathname = pathname;
  languages.forEach((lang) => {
    nextPathname = nextPathname?.replace(`/${lang}`, '');
  });

  return nextPathname;
};

export const convertToFormSelect = (
  list: any[],
  fieldForLabel: string | number | undefined = undefined,
  fieldForValue: string | number | undefined = undefined,
  noneOption: boolean | undefined = false
) => {
  if (!fieldForLabel || !fieldForValue) {
    return [
      ...list.reduce((arr: any, el: any) => {
        return [...arr, { label: el, value: el }];
      }, []),
    ];
  }
  if (typeof list === 'object' && list) {
    const listReturn = [
      ...list.reduce((arr: any, el: any) => {
        return [
          ...arr,
          {
            ...el,
            label: el[fieldForLabel] ?? 'None',
            value: el[fieldForValue] ?? '',
          },
        ];
      }, []),
    ];

    if (noneOption) {
      return [{ label: 'None', value: '' }, ...listReturn];
    }
    return listReturn;
  }
  return [{ label: 'None', value: '' }, ...list];
};

export const formatCurrency = (value: number) => {
  return value.toLocaleString().replaceAll(',', '.');
};

export const convertCurrencyToString = (currency: string) => {
  return currency.toString().replaceAll('.', '');
};

export const convertActiveOrDeactive = (value?: boolean) => {
  switch (value) {
    case true:
      return TourGuideStatus.ACTIVE;
    case false:
      return TourGuideStatus.DEACTIVE;
    default:
      break;
  }
};

export const convertToDate = (value: Date | string) => {
  const formatDayMonthYear = moment(value).format('DD/MM/YYYY');

  return formatDayMonthYear;
};

export const isDevelopment = () => {
  return window.location.origin.includes('localhost');
};

export const isDateObject = (date: Date | moment.Moment) => {
  return date instanceof Date;
};

export const isDaysJSObject = (date: Date) => {
  return date instanceof dayjs;
};

export const isMomentObject = (date: Date | moment.Moment) => {
  return date instanceof moment;
};

export const localeNumber = (
  number?: number,
  options?: {
    locales: Intl.LocalesArgument;
    options: Intl.NumberFormatOptions;
  }
) => {
  if (isNumber(number)) {
    return number.toLocaleString(options?.locales || 'vi-VI', options?.options);
  }

  return 'N/A';
};

export const paymentStatus = (status: string | undefined) => {
  switch (status) {
    case '00':
      return PaymentStatus.SUCCESS;
    case '02':
      return PaymentStatus.FAIL;
    default:
      return PaymentStatus.PROCESSING;
  }
};

export const snakeCaseToWords = (input: string) => {
  return input
    ?.split('_')
    ?.map((word) => word.toLowerCase())
    ?.join(' ');
};

export const convertToQueryDate = (value: dayjs.Dayjs | Date | string | undefined) => {
  if (value) {
    const formatYearMonthDay = dayjs(value).format('YYYY-MM-DD');
    return formatYearMonthDay;
  }
  return '';
};

export const convertStringToDateTime = (value: string) => {
  // Value Required HH:mm
  const time = value;
  const currentDate = new Date(); // Tạo đối tượng Date với ngày hiện tại

  // Lấy các thành phần ngày, tháng, năm từ ngày hiện tại
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();

  // Tạo đối tượng Date với ngày hiện tại và thời gian chỉ định
  const dateTime = new Date(
    year,
    month,
    day,
    parseInt(time.split(':')[0]),
    parseInt(time.split(':')[1])
  );
  return dateTime;
};

export const removeAMPM = (timeString: string) => {
  return timeString.replace(/AM|PM/gi, '');
};

export const showPhoneNumberByRegion = (phoneCode: PhoneCode, phone: string | number) => {
  if (phoneCode === PhoneCode.VN) {
    return `0${phone}`;
  }

  return phone;
};

export const totalPriceTour = (
  fixCost: number,
  priceAdult: number,
  priceChildren: number,
  numberAdult: number,
  numberChildren: number
) => {
  // Công thức update:
  // fix cost: A
  // Variate cost: b1 người lớn, b2 trẻ em
  // giá tính tour = C= A + b1x số lượng người lớn + b2x số lượng trẻ em;
  // Commission app là = D = C x 0.15 + 50k
  // Vat tính là: Vat =D x 0.05
  // Tổng giá tour = C (giá tour tính) + D (comm của app) + VAT
  // =================================================================
  // TourPrice = FixCost + (PriceForAdult * NumberAdult) + (PriceForChildren * NumberChildren)
  // CommissionApp = TourPrice * 0.15 + 50.000 VNĐ
  // VAT = CommissionApp * 0.05
  // TotalTourPrice = TourPrice + CommissionApp + VAT
  const serviceFee = 0.15;
  const fixServiceFee = 50000;
  const vatDefault = 0.05;

  const tourPrice = fixCost + priceAdult * numberAdult + priceChildren * numberChildren;
  const commissionApp = tourPrice * serviceFee + fixServiceFee;
  const VAT = commissionApp * vatDefault;
  const totalTourPrice = tourPrice + commissionApp + VAT;

  return totalTourPrice;
};

export const formatPrice = (price: number) => {
  const code = 'VND';
  const locales = 'it-IT';
  const options = {
    style: 'currency',
    currency: code,
  };

  return price.toLocaleString(locales, options).replace('VND', 'VNĐ');
};

export const detectBrowserHidden = () => {
  let hidden;
  if (typeof document.hidden !== 'undefined') {
    // Opera 12.10 and Firefox 18 and later support
    hidden = 'hidden';
  } else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden';
  } else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden';
  }
  return {
    isHidden: document[hidden],
  };
};

export const isImage = (url: string) => {
  return IMAGE_REGEX.test(url);
};

// Nếu có Video thì cho video lên đầu
export const sortGallery = (gallery: string[]) => {
  const sort = gallery?.sort((a: string, b: string) => {
    const isAImage = isImage(a);
    const isBImage = isImage(b);

    if (!isAImage && isBImage) {
      return -1; // Đưa a lên đầu
    } else if (isAImage && !isBImage) {
      return 1; // Đưa b lên đầu
    } else {
      return 0; // Giữ nguyên thứ tự
    }
  });

  return sort;
};
