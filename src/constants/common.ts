import GotuLogo from '../../public/images/logo_gotu.png';
export const DEFAULT_ROW_PER_PAGE = 20;
export const TIMEOUT_TO_UNMOUNT_MODAL = 500;
export const MAX_WIDTH_CONTAINER = 1200;
export const MAX_HEIGHT_NAVBAR = 96;
export const START_PAGE = 1;
export const DEFAULT_FORMAT_DATE = 'dd/MM/yyyy';
//* 84 -> Viet Nam
export const DEFAULT_PREFIX_PHONE = 'VN';

export const PHONE_REGEX = /(0[3|5|7|8|9]|3|5|7|9)+([0-9]{8})\b/g;
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const IMAGE_REGEX = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/;
export type OptionSelection = {
  label: string | React.ReactNode;
  value: any;
};

export interface RowCommon {
  id: string | number;
  [x: string]: any;
}

export const optionsActiveOrInActive: OptionSelection[] = [
  {
    label: 'Active',
    value: 0,
  },
  {
    label: 'In active',
    value: 1,
  },
];

export const ratingData = [
  {
    value: 1,
    star: 1,
  },
  {
    value: 2,
    star: 2,
  },
  {
    value: 3,
    star: 3,
  },
  {
    value: 4,
    star: 4,
  },
  {
    value: 5,
    star: 5,
  },
];

export const LOGO_IMAGE_PATH = GotuLogo;

export type File = {
  lastModified?: number;
  lastModifiedDate?: any;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};

export enum Method {
  PHONE = 'PHONE',
  EMAIL = 'EMAIL',
}

export enum Roles {
  ADMIN = 'ADMIN',
  TOUR_GUIDE = 'TOUR_GUIDE',
  MERCHANT = 'MERCHANT',
  CUSTOMER = 'CUSTOMER',
  VENDOR = 'VENDOR',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum UserType {
  ADMIN = 'ADMIN',
  USER = 'USER',
  OTHER = 'OTHER',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
  BANNED = 'BANNED',
}

export enum modalAction {
  CREATE = 'create',
  DETAILS = 'details',
  EDIT = 'edit',
}

export enum TourStatus {
  DRAFT = 'DRAFT',
  PUBLISH = 'PUBLISH',
  DELETED = 'DELETED',
}

export enum VendorStatus {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
  DRAFT = 'DRAFT',
  DELETED = 'DELETED',
}

export enum Language {
  VIETNAMESE = 'VN',
  ENGLISH = 'US',
  KOREAN = 'KR',
  JAPAN = 'JP',
  CHINA = 'CN',
}

export enum TourGuideTabs {
  Profile = 0,
  Payment = 1,
  Orders = 2,
  ProfileUpdate = 3,
}
export enum DayOfWeekTabs {
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
  Sunday = 7,
}
export enum ReviewTabs {
  ReviewTour = 1,
  ReviewTourGuide = 2,
}
export enum YesOrNoValue {
  Yes = '1',
  No = '2',
  Other = '3',
}

export enum TourGuideStatus {
  DEACTIVE = 'DEACTIVE',
  ACTIVE = 'ACTIVE',
}
export enum VendorStatus {
  DEACTIVE = 'DEACTIVE',
  ACTIVE = 'ACTIVE',
}

export enum TourGuideInfoStatus {
  VERIFIED = 'VERIFIED',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  DISAPPROVAL = 'DISAPPROVAL',
  DELETED = 'DELETED',
  NEW = 'NEW',
  CLEAR = 'CLEAR',
}

export enum GalleryStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  OTHER = 'OTHER',
}

export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  OTHER = 'OTHER',
}

export enum PaymentMethodStatus {
  NA = 'N/A',
  PENDING = 'PENDING',
  SUCCESSFULLY = 'SUCCESSFULLY',
  REFUND = 'REFUND',
  FAILED = 'FAILED',
}

export enum SkeletonType {
  TOUR = 'TOUR',
  SERVICE = 'SERVICE',
  CATEGORY = 'CATEGORY',
  DETAIL = 'DETAIL',
  PLACES_LIST = 'PLACES_LIST',
  TOUR_LIST = 'TOUR_LIST',
}

export enum StatusType {
  OPEN = 'OPEN',
  CLLOSE = 'CLOSE',
}

export enum FilterStatusTourBooking {
  ALL = 'ALL',
  NEW = 'NEW',
  APPLIED = 'APPLIED',
  MATCHED = 'MATCHED',
  PAYMENT_SUCCESS = 'PAYMENT_SUCCESS',
  EXPIRED_PAYMENT = 'EXPIRED_PAYMENT',
  CUSTOMER_CANCELED = 'CUSTOMER_CANCELED',
  TOUR_GUIDE_CANCELED = 'TOUR_GUIDE_CANCELED',
  SUCCESSFULLY = 'SUCCESSFULLY',
}

export enum StatusReservationVendor {
  PENDING = 'PENDING',
  MATCHED = 'MATCHED',
  WAIT_FOR_CHECK_IN = 'WAIT_FOR_CHECK_IN',
  CHECKED_IN = 'CHECKED_IN',
  SUCCESSFULLY = 'SUCCESSFULLY',
  CANCELED = 'CANCELED',
}

export enum StatusReservationVendorPayment {
  SUCCESSFULLY = 'SUCCESSFULLY', // payment success
  REFUND = 'REFUND', // customer cancel and got refund
  CANCELED = 'CANCELED',
  EXPIRED_PAYMENT = 'EXPIRED_PAYMENT', // time out of payment = cancel
}
export enum StatusMyBookingTour {
  NEW = 'NEW',
  APPLIED = 'APPLIED',
  MATCHED = 'MATCHED',
  PAYMENT_SUCCESS = 'PAYMENT_SUCCESS',
  EXPIRED_PAYMENT = 'EXPIRED_PAYMENT',
  CUSTOMER_CANCELED = 'CUSTOMER_CANCELED',
  TOUR_GUIDE_CANCELED = 'TOUR_GUIDE_CANCELED',
  SUCCESSFULLY = 'SUCCESSFULLY',
}

export enum FormatFiles {
  PNG = 'png',
  JPG = 'jpg',
  JPEG = 'jpeg',
  PDF = 'pdf',
  DOC = 'docx',
}

export enum TypeFileImport {
  PDF = 'application/pdf',
  IMAGE = 'image/jpeg',
  PNG = 'image/png',
  VIDEO = 'video/mp4',
}
export enum TypeFile {
  PDF = 'PDF',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  DOC = 'DOC',
}

export enum PaymentStatus {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
  PROCESSING = 'PROCESSING',
}

export enum TransactionProcess {
  PENDING = 'PENDING', // tour booking has customer matched with a tour guide
  SUCCESSFULLY = 'SUCCESSFULLY', // payment success
  REFUND = 'REFUND', // customer cancel and got refund
  CANCELED = 'CANCELED',
  EXPIRED_PAYMENT = 'EXPIRED_PAYMENT', // time out of payment = cancel
}
export enum VendorBookingStatus {
  PENDING = 'PENDING',
  MATCHED = 'MATCHED',
  WAIT_FOR_CHECK_IN = 'WAIT_FOR_CHECK_IN',
  CHECKED_IN = 'CHECKED_IN',
  SUCCESSFULLY = 'SUCCESSFULLY',
  CANCELED = 'CANCELED',
}

export enum BannerType {
  GENERAL = 'GENERAL',
  HOME_BANNER_PAGE = 'HOME_BANNER_PAGE',
}

export enum BannerStatus {
  PUBLISH = 'PUBLISH',
  DRAFT = 'DRAFT',
  DELETED = 'DELETED',
}

export enum BooleanValue {
  True = 1,
  False = 0,
}

export enum ProviderSocial {
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
}

export enum OTPAction {
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  CUSTOMER_REGISTER = 'CUSTOMER_REGISTER',
  TOUR_GUIDE_REGISTER = 'TOUR_GUIDE_REGISTER',
}
