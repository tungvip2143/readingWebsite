import { AxiosResponse } from "axios";
import { ResponseCommon } from "interfaces/common";

export interface VendorType {
  id : number,
  name :  string ,
}

export type ResponseGetListTypeVendor = AxiosResponse<ResponseCommon<VendorType[]>>;