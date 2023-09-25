import { AxiosResponse } from 'axios';
import { TypeFile } from 'constants/common';
import { ResponseCommon } from 'interfaces/common';

export interface Image {
  uri: string;
  fileType: TypeFile;
}

export interface ResponseImage {
  data: Image[];
}

export type ResponseUploadMultipleImage = AxiosResponse<ResponseCommon<ResponseImage>>;
