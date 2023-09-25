import { parsePhoneNumber } from 'helpers/phoneNumberFormat';
import { RequestSignUp } from 'modules/signUp/signUp.interface';

class SignUpModel {
  static parseBodyToRequest(value: RequestSignUp) {
    const phoneNumberValues = value?.phone || '';
    const phonePrefix = value?.phoneCode || 'VN';
    const { onlyPhoneFormated } = parsePhoneNumber(phoneNumberValues, phonePrefix);

    const result = {
      firstName: value.firstName,
      lastName: value.lastName,
      phone: onlyPhoneFormated.replace(/ /g, ''),
      password: value.password,
      confirmPassword: value.confirmPassword,
      phoneCode: phonePrefix,
      acceptTerm: value.acceptTerm,
      email: value.email,
      gender: value.gender
    };

    return result;
  }
}

export default SignUpModel;
