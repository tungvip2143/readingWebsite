import { parsePhoneNumber } from 'helpers/phoneNumberFormat';
import { RequestChangePassword } from 'modules/forgotPassword/forgotPassword.interface';

class ChangePasswordModel {
  static parseBodyToRequest(value: RequestChangePassword) {
    const phoneNumberValues = value?.phone || '';
    const phonePrefix = value?.phoneCode || 'VN';
    const password = value?.password
    const confirmPassword = value?.confirmPassword;
    const role = value?.role;
    const { onlyPhoneFormated } = parsePhoneNumber(phoneNumberValues, phonePrefix);

    const result = {
      phone: onlyPhoneFormated.replace(/ /g, '') || '',
      password: password,
      confirmPassword: confirmPassword,
      phoneCode: phonePrefix,
      role: role,
    };

    return result;
  }
}

export default ChangePasswordModel;
