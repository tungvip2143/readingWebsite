import { Field, useFormikContext } from 'formik';
import React from 'react';
import CustomFields from './CustomFields';
import { convertToFormSelect } from 'helpers/common';
import { useTranslations } from 'next-intl';
import { SxProps } from '@mui/material';
import { isEmpty } from 'lodash';
import useGetListProvinceDetail from 'modules/province/hooks/useGetListProvinceDetail';

interface Props {
  name: string;
  nameClearAfterChange?: string[];
  isDisabled?: boolean;
  sxContainer?: SxProps;
}

const SelectProvinceDetail = ({ name, nameClearAfterChange, isDisabled, sxContainer }: Props) => {
  const t = useTranslations();
  const { setFieldValue } = useFormikContext();

  const { data, isLoading: isLoadingListProvince } = useGetListProvinceDetail();
  const optionProvinces = convertToFormSelect(data, 'name', 'code') || [];

  return (
    <Field
      size='small'
      component={CustomFields.SelectField}
      name={name}
      placeholder={t('LocalFriend.provinceCity')}
      options={optionProvinces}
      fullWidth
      disabled={isDisabled}
      loading={isLoadingListProvince}
      sx={sxContainer}
      afterOnChange={() => {
        if (!isEmpty(nameClearAfterChange)) {
          nameClearAfterChange?.forEach((item) => setFieldValue(item, ''));
        }
      }}
    />
  );
};

export default SelectProvinceDetail;
