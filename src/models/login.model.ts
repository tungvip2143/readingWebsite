import { FormLoginValues } from 'components/Client/Components/Dialogs/DialogLogin';
import { Method } from 'constants/common';
import { parsePhoneNumber } from 'helpers/phoneNumberFormat';

class LoginModel {
  // static parseInitialValues(item?: ) {
  //   const result = {
  //     phoneNumber: '',
  //     password: '',
  //     phoneCode: 'VN',
  //     saveLogin: false,
  //   };
  //   return result as FormLoginValues;
  // }
  static parseBodyToRequest(value: FormLoginValues) {
    const phoneNumberValues = value?.phoneNumber || '';
    const phonePrefix = value?.phoneCode || 'VN';
    const { onlyPhoneFormated } = parsePhoneNumber(phoneNumberValues, phonePrefix);

    const result = {
      phone: onlyPhoneFormated.replace(/ /g, '') || undefined,
      password: value?.password || '',
      phoneCode: value?.phoneCode || undefined,
      saveLogin: value?.saveLogin || false,
      method: value?.method || Method.PHONE,
      email: value?.email || undefined,
    };

    return result;
  }
}

export default LoginModel;
