import { parsePhoneNumber } from 'helpers/phoneNumberFormat';
import { isEmpty } from 'lodash';
import { RequestResendOTP } from 'modules/forgotPassword/forgotPassword.interface';

class ReSendOTPdModel {
  static parseBodyToRequest(value: RequestResendOTP) {
    const phoneNumberValues = value?.phone;
    const phonePrefix = value?.phoneCode;
    const method = value?.method;
    const role = value?.role;
    const email = value?.email;
    const action = value?.action;
    const { onlyPhoneFormated } = parsePhoneNumber(phoneNumberValues, phonePrefix);

    const result = {
      action: action,
      role: role,
      method: method,
      phone: onlyPhoneFormated.replace(/ /g, '') || undefined,
      phoneCode: isEmpty(phoneNumberValues) ? undefined : phonePrefix,
      email: isEmpty(phoneNumberValues) ? email : undefined,
    };

    return result;
  }
}

export default ReSendOTPdModel;
