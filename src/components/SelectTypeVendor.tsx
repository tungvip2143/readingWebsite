import { Field, useFormikContext } from 'formik';
import React from 'react';
import CustomFields from './CustomFields';
import { convertToFormSelect } from 'helpers/common';
import { useTranslations } from 'next-intl';
import { SxProps } from '@mui/material';
import { isEmpty } from 'lodash';
import useGetListTypeVendor from 'modules/vendorType/hooks/useGetListTypeVendor';

interface Props {
  name: string;
  isDisabled?: boolean;
  sxContainer?: SxProps;
  isMultiple?: boolean;
}

const SelectListTypeVendor = ({ name, isDisabled, sxContainer, isMultiple }: Props) => {
  const t = useTranslations();
  const { setFieldValue } = useFormikContext();

  const { data, isLoading: isLoadingListProvince } = useGetListTypeVendor();
  const optionTypeVendor = convertToFormSelect(data, 'name', 'id') || [];

  return (
    <Field
      size='small'
      component={CustomFields.SelectField}
      name={name}
      placeholder={t('Vendor.typeVendor')}
      options={optionTypeVendor}
      fullWidth
      disabled={isDisabled}
      loading={isLoadingListProvince}
      sx={sxContainer}
      isMultiple={isMultiple}
    />
  );
};

export default SelectListTypeVendor;
