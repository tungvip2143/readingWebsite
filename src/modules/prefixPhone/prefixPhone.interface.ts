import { AxiosResponse } from 'axios';
import { ResponseCommon } from 'interfaces/common';

export interface PrefixPhone {
  countryNameEn: string;
  countryCode: string;
  countryCallingCode: string;
  flag: string;
}

export type ResponseGetListPrefixPhone = AxiosResponse<ResponseCommon<PrefixPhone[]>>;
