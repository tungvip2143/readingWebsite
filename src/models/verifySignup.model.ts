import { parsePhoneNumber } from 'helpers/phoneNumberFormat';
import { isEmpty } from 'lodash';
import { RequestVerifyRegisterCustomer } from 'modules/verifyRegisterCustomer/verifyRegisterCustomer.interface';

class VerifySignupModel {
  static parseBodyToRequest(value: RequestVerifyRegisterCustomer) {
    const phoneNumberValues = value?.phone || '';
    const phonePrefix = value?.phoneCode || '';
    const email = phoneNumberValues ? undefined : value?.email;
    const otp = value?.otp;
    const { onlyPhoneFormated } = parsePhoneNumber(phoneNumberValues, phonePrefix);
    const isNotPhoneNumber = isEmpty(phoneNumberValues);

    const result = {
      phoneCode: (isNotPhoneNumber ? undefined : phonePrefix) || undefined,
      otp: otp,
      phone: onlyPhoneFormated.replace(/ /g, '') || undefined,
      email: email || undefined,
    };

    return result;
  }
}

export default VerifySignupModel;
