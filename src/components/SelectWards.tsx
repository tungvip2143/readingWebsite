import { Field } from 'formik';
import React from 'react';
import CustomFields from './CustomFields';
import { convertToFormSelect } from 'helpers/common';
import { useTranslations } from 'next-intl';
import useGetListWards from 'modules/province/hooks/useGetListWards';
import { SxProps } from '@mui/material';
interface Props {
  name: string;
  isDisabled?: boolean;
  districtCode: string;
  sxContainer?: SxProps;
}

const SelectWards = ({ name, isDisabled, districtCode, sxContainer }: Props) => {
  const t = useTranslations();
  const isDistrictCode = !!districtCode;

  const { data, isLoading: isLoadingListProvince } = useGetListWards(districtCode, isDistrictCode);
  const optionWards = convertToFormSelect(data, 'name', 'code') || [];

  return (
    <Field
      size='small'
      component={CustomFields.SelectField}
      name={name}
      placeholder={t('Vendor.wards')}
      options={optionWards}
      fullWidth
      disabled={isDisabled}
      loading={isLoadingListProvince}
      sx={sxContainer}
    />
  );
};

export default SelectWards;
