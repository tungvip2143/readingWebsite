import { AxiosResponse } from 'axios';
import { Gender } from 'constants/common';
import { Gallery, Media, ResponseCommon } from 'interfaces/common';
import { Province } from 'modules/province/province.interface';
import { BankAccount, MediaItem, TourGuide } from 'modules/tourGuide/article.interface';

export interface TourGuideArea {
  area: Province;
  areaId: number;
  id: number;
  tourGuideId: number;
}

// export interface Profile {
//   lastName?: string;
//   firstName?: string;
//   description?: string;
//   residenceAccordingToPermanentAddress?: string;
//   currentResidence?: string;
//   nameEmergency?: string;
//   phoneEmergency?: string;
//   phoneEmergencyCode?: string;
//   relationShip?: string;
//   email?: string;
//   cid?: string;
//   avatar?: string;
//   areas?: number[];
//   gender?: Gender;
//   Gallery?: Gallery[];
//   phone?: string;
//   dob?: string;
//   isCertificate?: boolean;
//   phoneCode: string;
//   tourGuidePaymentMethod: BankAccount[];
//   TourGuideArea: TourGuideArea[];
// }

export type BodyUpdateProfileTourGuide = {
  lastName?: string;
  firstName?: string;
  description?: string;
  residenceAccordingToPermanentAddress?: string;
  currentResidence?: string;
  nameEmergency?: string;
  phoneEmergency?: string;
  phoneEmergencyCode?: string;
  relationShip?: string;
  email?: string;
  cid?: string;
  avatar?: string;
  areas?: number[];
  gender?: number;
  phone?: string;
  dob?: string;
  isCertificate?: boolean;
  bankCode?: string;
  bankName?: string;
  paymentMethodStatus?: string;
  receiveName?: string;
  media?: MediaItem[];
  [key: string]: string | number | boolean | number[] | undefined | MediaItem[] | string[];
};

export type ResponseGetProfile = AxiosResponse<ResponseCommon<TourGuide>>;

export type RequestUpdateProfileTourGuide = { body: BodyUpdateProfileTourGuide };

export type ReponseUpdateProfileTourGuide = AxiosResponse<TourGuide>;
