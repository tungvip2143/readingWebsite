import { RequestConfirmReservationVendor } from 'modules/reservationVendor/reservationVendor.interface';
import { RequestDeleteTourGuideSubscribe } from 'modules/tourGuideSubscribe/tourGuideSubscribe.interface';
import { RequestDeleteVendorSubscribe } from 'modules/vendorSubscribe/vendorSubscribe.interface';

const BASE_URL = `${process.env.NEXT_PUBLIC_ROOT_URL}/api/v1`;

export const IMG_URL = process.env.NEXT_PUBLIC_ROOT_URL;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  LOGIN: `${BASE_URL}/auth/login-admin`,
  LOGIN_PHONE: `${BASE_URL}/auth/login-phone`,
  LOGIN_SOCIAL: `${BASE_URL}/auth/login-social`,
  LOGIN_BY_ROLE: {
    TOUR_GUIDE: `${BASE_URL}/auth/login-tour-guide`,
    VENDOR: `${BASE_URL}/auth/login-vendor`,
  },
  REGISTER: `${BASE_URL}/auth/register`,
  REGISTER_BY_ROLE: {
    TOUR_GUIDE: `${BASE_URL}/auth/register-tour-guide`,
    VENDOR: `${BASE_URL}/auth/register-vendor`,
  },
  VERIFY_REGISTER_BY_ROLE: {
    TOUR_GUIDE: `${BASE_URL}/auth/verify-register-tour-guide`,
    VENDOR: `${BASE_URL}/auth/verify-register-customer`,
  },
  VERIFY_REGISTER_CUSTOMER: `${BASE_URL}/auth/verify-register-customer`,
  UPLOAD_FILE_SINGLE: `${BASE_URL}/upload/single`,
  CUSTOMER: `${BASE_URL}/customer`,
  GET_PROFILE: `${BASE_URL}/auth/profile`,
  TOUR_GUIDE: `${BASE_URL}/tour-guide`,
  TOUR: {
    GET_LIST_BY_CATEGORY: `${BASE_URL}/home/tours-by-category`,
    GET_LIST_BY_CATEGORY_TRANSFORM: `${BASE_URL}/home/tours-by-category`,
    GET_LIST: `${BASE_URL}/tour`,
    GET_LIST_PUBLIC: `${BASE_URL}/tour/public`,
    CREATE: `${BASE_URL}/tour`,
    WISH_LIST_TOUR: `${BASE_URL}/wish-list-tour`,
  },
  PROVINCE: {
    GET_LIST: `${BASE_URL}/areas`,
    GET_LIST_PROVINCE: `${BASE_URL}/province-codes`,
  },
  TOUR_CATEGORY: {
    GET_LIST: `${BASE_URL}/tour-category`,
  },
  UPLOAD: {
    MULTIPLE: `${BASE_URL}/upload`,
  },
  TOUR_BOOKING: `${BASE_URL}/tour-booking`,
  MY_TOUR_BOOKING: `${BASE_URL}/tour-booking/list`,
  VENDOR: {
    GET_LIST: `${BASE_URL}/vendor`,
    WISH_LIST_VENDOR: `${BASE_URL}/wish-list-vendor`,
    UPDATE_VENDOR: (id: number | string) => `${BASE_URL}/vendor/${id}/update`,
  },
  VENDOR_SUBSCRIBE: {
    GET_LIST: (id: number) => `${BASE_URL}/vendor-subscribe/${id}/by-tour`,
    CREATE: (id: number) => `${BASE_URL}/vendor-subscribe/${id}/create-vendor-subscribe`,
    DELETE: (id: RequestDeleteVendorSubscribe) =>
      `${BASE_URL}/vendor-subscribe/${id}/delete-vendor-subscribe`,
  },
  TOURGUIDE_SUBSCRIBE: {
    GET_LIST: (id: number) => `${BASE_URL}/tour-guide-subscribe/${id}/by-tour`,
    CREATE: (id: number) => `${BASE_URL}/tour-guide-subscribe/${id}/create-tour-subscribe`,
    DELETE: (id: RequestDeleteTourGuideSubscribe) =>
      `${BASE_URL}/tour-guide-subscribe/${id}/delete-tour-subscribe`,
  },
  VENDOR_PUBLIC: `${BASE_URL}/vendor/public`,
  PREFIX_PHONE: {
    GET_LIST: `${BASE_URL}/get-phone-code`,
  },
  DISTRICT: {
    GET_LIST: (provinceCode: string) => `${BASE_URL}/${provinceCode}/district-by-province`,
  },
  WARDS: {
    GET_LIST: (districtCode: string) => `${BASE_URL}/${districtCode}/wards-by-district`,
  },
  TOUR_RECOMMENDATION: {
    GET_LIST: `${BASE_URL}/tour/recommendation-list`,
  },
  TOUR_GUIDE_APPLY_BOOKING: {
    APPLY: (id: number) => `${BASE_URL}/tour-guide-apply-booking/${id}/applied`,
    CANCEL: (id: number) => `${BASE_URL}/tour-guide-apply-booking/${id}/cancel-apply`,
  },
  VENDOR_RECOMMENDATION: {
    GET_LIST: `${BASE_URL}/vendor/recommendation-list`,
  },
  RESERVATIONVENDOR: {
    GET_LIST: `${BASE_URL}/reservation-vendor`,
    CONFIRM: (id: RequestConfirmReservationVendor) =>
      `${BASE_URL}/reservation-vendor/${id}/vendor-confirmed`,
    CANCEL: (id: RequestConfirmReservationVendor) =>
      `${BASE_URL}/reservation-vendor/${id}/cancel-reservation`,
    VENDOR_RESERVATION_SUCCESSFUL_COUNT: `${BASE_URL}/home/vendor-reservation-successful-count`,
  },
  LIST_VENDOR_TYPE: {
    GET_LIST: `${BASE_URL}/get-vendor-type`,
  },
  TRANSACTION_BOOK: {
    TOUR: `${BASE_URL}/tour-booking-transaction`,
    VENDOR: `${BASE_URL}/reservation-transaction`,
  },
  PROFILE: {
    GET_PROFILE: `${BASE_URL}/auth/profile`,
    UPDATE_TOUR_GUIDE_PROFILE: `${BASE_URL}/tour-guide/tour-guide-update-information`,
  },
  HOT_DEAL: {
    GENERAL: `${BASE_URL}/hot-deal`,
    GET_LIST: `${BASE_URL}/hot-deal/list`,
    CREATE: `${BASE_URL}/hot-deal/create`,
  },
  FORGOT_PASSWORD: {
    FORGOT: `${BASE_URL}/auth/forgot-password`,
    VERIFY_OTP: `${BASE_URL}/auth/verify-otp-change-password`,
    VERIFY_OTP_EMAIL: `${BASE_URL}/auth/verify-email-otp-change-password`,
    CHANGE_PASSWORD: `${BASE_URL}/auth/change-password-otp`,
    CHANGE_PASSWORD_EMAIL: `${BASE_URL}/auth/change-password-email-otp`,
  },
  RESEND_OTP: `${BASE_URL}/auth/resend-otp`,
  REVIEW: `${BASE_URL}/review`,
};
