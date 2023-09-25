const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

interface IPhoneNumber {
  phoneNumberFormated: string;
  onlyPhoneFormated: string;
  isValidated: boolean;
  originalPhone?: string;
}
export const parsePhoneNumber = (number?: string, countryCode?: string): IPhoneNumber => {
  const value = number?.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const country = countryCode ?? '';
  let phoneNumberFormated = '';
  let onlyPhoneFormated = value ?? '';
  let isValidated = false;

  if (country && value && value.length > 4 && value.length < 17) {
    isValidated = phoneUtil.isValidNumberForRegion(phoneUtil?.parse(value, country), country);
    if (isValidated) {
      phoneNumberFormated = phoneUtil.format(
        phoneUtil.parseAndKeepRawInput(value, country),
        PNF.INTERNATIONAL
      );
      onlyPhoneFormated = '';
      phoneNumberFormated.split(' ').forEach((value: string, index: number) => {
        if (index != 0) {
          onlyPhoneFormated = onlyPhoneFormated + value + ' ';
        }
      });
    }
  }

  return {
    phoneNumberFormated: phoneNumberFormated,
    onlyPhoneFormated: onlyPhoneFormated.trim(),
    isValidated: isValidated,
    originalPhone: number,
  };
};
