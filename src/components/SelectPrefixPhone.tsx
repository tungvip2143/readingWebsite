import { Field } from 'formik';
import React from 'react';
import CustomFields from './CustomFields';
import { convertToFormSelect } from 'helpers/common';
import { useTranslations } from 'next-intl';
import useGetListPrefixPhone from 'modules/prefixPhone/hooks/useGetListPrefixPhone';
import { isString, uniqBy } from 'lodash';

interface Props {
  name: string;
  isDisabled?: boolean;
}

const parseContryCode = (countryCode: string) => {
  if (!isString(countryCode)) {
    return 0;
  }

  let nextCountryCode = countryCode;
  nextCountryCode = nextCountryCode.replaceAll(' ', '');
  return Number(nextCountryCode);
};

const SelectPrefixPhone = ({ name, isDisabled }: Props) => {
  const t = useTranslations();
  const { data, isLoading: isLoadingListProvince } = useGetListPrefixPhone();
  const optionProvinces =
    uniqBy(
      convertToFormSelect(data || [], 'countryCallingCode', 'countryCode')
        ?.sort((a, b) => {
          return parseContryCode(a?.countryCallingCode) - parseContryCode(b?.countryCallingCode);
        })
        ?.map((el) => ({
          ...el,
          label: `+${el.label} ${el.value}`,
          // value: `+${el.value}`,
        })),
      'value'
    ) || [];

  return (
    <Field
      size='small'
      component={CustomFields.SelectField}
      name={name}
      placeholder={t('LocalFriend.phonePrefix')}
      options={optionProvinces}
      disabled={isDisabled}
      loading={isLoadingListProvince}
      fullWidth
    />
  );
};

export default SelectPrefixPhone;
