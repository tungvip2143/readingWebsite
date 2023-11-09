import GotuLogo from '../../public/images/Mediwey _magazine.jpg';
export const DEFAULT_ROW_PER_PAGE = 20;
export const TIMEOUT_TO_UNMOUNT_MODAL = 500;
export const MAX_WIDTH_CONTAINER = 1200;
export const MAX_HEIGHT_NAVBAR = 96;
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
  ADMIN = 'ADMIN',
  USER = 'USER',
}
