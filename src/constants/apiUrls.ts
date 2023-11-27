import { RequestConfirmReservationVendor } from 'modules/reservationVendor/reservationVendor.interface';
import { RequestDeleteTourGuideSubscribe } from 'modules/tourGuideSubscribe/tourGuideSubscribe.interface';
import { RequestDeleteVendorSubscribe } from 'modules/vendorSubscribe/vendorSubscribe.interface';

// const BASE_URL = `${process.env.NEXT_PUBLIC_ROOT_URL}/api/v1`;
const BASE_URL = `${process.env.NEXT_PUBLIC_ROOT_URL}`;
export const IMG_URL = process.env.NEXT_PUBLIC_ROOT_URL;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  LOGIN: `${BASE_URL}/login`,
  REGISTER: `${BASE_URL}/auth/register`,
  UPLOAD_FILE_SINGLE: `${BASE_URL}/upload`,
  ARTICLE: `${BASE_URL}/article`,
  UPLOAD: {
    MULTIPLE: `${BASE_URL}/upload`,
  },
  PROFILE: {
    GET_PROFILE: `${BASE_URL}/auth/profile`,
    UPDATE_TOUR_GUIDE_PROFILE: `${BASE_URL}/tour-guide/tour-guide-update-information`,
  },
};
