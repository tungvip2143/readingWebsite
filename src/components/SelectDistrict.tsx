import { Field, useFormikContext } from 'formik';
import React, { useCallback } from 'react';
import CustomFields from './CustomFields';
import { convertToFormSelect } from 'helpers/common';
import { useTranslations } from 'next-intl';
import useGetListDistrict from 'modules/province/hooks/useGetListDistrict';
import { SxProps } from '@mui/material';

interface Props {
  name: string;
  isDisabled?: boolean;
  provinceCode: string;
  nameWard?: string;
  sxContainer?: SxProps;
  hanldeOnChange?(): void;
}

const SelectDistrict = ({ name, isDisabled, provinceCode, sxContainer, nameWard }: Props) => {
  const t = useTranslations();
  const isProvinceCode = !!provinceCode;

  const { data, isLoading: isLoadingListProvince } = useGetListDistrict(
    provinceCode,
    isProvinceCode
  );

  const optionDistrict = convertToFormSelect(data, 'name', 'code') || [];

  return (
    <Field
      size='small'
      component={CustomFields.SelectField}
      name={name}
      placeholder={t('Vendor.district')}
      options={optionDistrict}
      fullWidth
      disabled={isDisabled}
      loading={isLoadingListProvince}
      sx={sxContainer}
    />
  );
};

export default SelectDistrict;
