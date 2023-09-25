import { parsePhoneNumber } from 'helpers/phoneNumberFormat';
import { RequestForgotPassword } from 'modules/forgotPassword/forgotPassword.interface';

class ForgotPasswordModel {
  static parseBodyToRequest(value: RequestForgotPassword) {
    const phoneNumberValues = value?.phone || '';
    const phonePrefix = value?.phoneCode || 'VN';
    const role = value?.role;
    const method = value?.method;
    const email = value?.email;
    const { onlyPhoneFormated } = parsePhoneNumber(phoneNumberValues, phonePrefix);

    const result = {
      phone: onlyPhoneFormated.replace(/ /g, '') || undefined,
      phoneCode: phoneNumberValues === '' ? undefined : phonePrefix,
      role: role,
      method: method,
      email: email || undefined
    };

    return result;
  }
}

export default ForgotPasswordModel;
