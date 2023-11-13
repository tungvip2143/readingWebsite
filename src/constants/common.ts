import GotuLogo from '../../public/images/Mediwey _magazine.png';
export const DEFAULT_ROW_PER_PAGE = 20;
export const TIMEOUT_TO_UNMOUNT_MODAL = 500;
export const MAX_WIDTH_CONTAINER = 900;
export const MAX_HEIGHT_NAVBAR = 72;
export const WIDTH_SIDEBAR = '20%';
export const START_PAGE = 1;
export const DEFAULT_FORMAT_DATE = 'DD/MM/yyyy';

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const IMAGE_REGEX = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/;

export const TINY_API = '1dblwiidy5uy8q0py1veocjgnpetoqnahlhdaousvgja8yak';
export type OptionSelection = {
  label: string | React.ReactNode;
  value: any;
};

export interface RowCommon {
  id: string | number;
  [x: string]: any;
}

export const LOGO_IMAGE_PATH = GotuLogo;

export type File = {
  lastModified?: number;
  lastModifiedDate?: any;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};

export enum Language {
  VIETNAMESE = 'VN',
  ENGLISH = 'US',
  KOREAN = 'KR',
  JAPAN = 'JP',
  CHINA = 'CN',
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

export enum modalAction {
  CREATE = 'create',
  UPDATE = 'update',
  DETAIL = 'detail',
}

export enum Roles {
  ADMIN = 1,
  USER = 2,
}

export enum Topic {
  EVENTS = 'Events',
  THREE_F = '3F',
  TOP_PLUS = 'Top +',
  THE_FACE_DEWEY = 'The face Dewey',
  SHOCK = 'Shock',
  STUDY_CORNER = 'Study corner',
  CHARITY = 'Charity',
}
