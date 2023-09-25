import { parsePhoneNumber } from 'helpers/phoneNumberFormat';
import { isEmpty } from 'lodash';
import { RequestVerifyForgotPassword } from 'modules/forgotPassword/forgotPassword.interface';

class VerifyForgotPasswordModel {
  static parseBodyToRequest(value: RequestVerifyForgotPassword) {
    const phoneNumberValues = value?.phone;
    const phonePrefix = value?.phoneCode;
    const otp = value?.otp;
    const role = value?.role;
    const email = value?.email;
    const { onlyPhoneFormated } = parsePhoneNumber(phoneNumberValues, phonePrefix);

    const result = {
      phoneCode: isEmpty(phoneNumberValues) ? undefined : phonePrefix,
      role: role,
      otp: otp,
      email: email || undefined,
      phone: onlyPhoneFormated.replace(/ /g, '') || undefined,
    };

    return result;
  }
}

export default VerifyForgotPasswordModel;
