import { Field, useFormikContext } from 'formik';
import React from 'react';
import CustomFields from './CustomFields';
import { convertToFormSelect } from 'helpers/common';
import { useTranslations } from 'next-intl';
import { SxProps } from '@mui/material';
import { isEmpty } from 'lodash';
import useGetListAreas from 'modules/province/hooks/useGetListAreas';

interface Props {
  name: string;
  nameClearAfterChange?: string[];
  isDisabled?: boolean;
  isMultiple?: boolean;
  sxContainer?: SxProps;
}

const SelectProvince = ({
  name,
  nameClearAfterChange,
  isDisabled,
  sxContainer,
  isMultiple,
}: Props) => {
  const t = useTranslations();
  const { setFieldValue } = useFormikContext();

  const { data, isLoading: isLoadingListProvince } = useGetListAreas();
  const optionProvinces = convertToFormSelect(data, 'name', 'id') || [];

  return (
    <Field
      size='small'
      component={CustomFields.SelectField}
      name={name}
      placeholder={t('Articles.provinceCity')}
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
      isMultiple={isMultiple}
    />
  );
};

export default SelectProvince;
