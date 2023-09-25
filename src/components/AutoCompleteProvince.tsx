import { Field } from 'formik';
import React from 'react';
import CustomFields from './CustomFields';
import { convertToFormSelect } from 'helpers/common';
import { useTranslations } from 'next-intl';
import { SxProps } from '@mui/material';
import useGetListAreas from 'modules/province/hooks/useGetListAreas';
import { SetBooleanState, SetOptionsValue } from 'interfaces/common';
import { showError } from 'helpers/toast';

interface Props {
  name: string;
  nameClearAfterChange?: string[];
  isDisabled?: boolean;
  isMultiple?: boolean;
  sxContainer?: SxProps;
}

const AutoCompleteProvince = ({ name, sxContainer, isMultiple }: Props) => {
  const t = useTranslations();
  const { data, isLoading: isLoadingListProvince } = useGetListAreas();
  const optionProvinces = convertToFormSelect(data, 'name', 'provinceCode') || [];

  return (
    <Field
      sizeCustom='small'
      component={CustomFields.AutoCompleteField}
      name={name}
      label={t('Tour.province')}
      multiple={isMultiple}
      disableCloseOnSelect={isMultiple}
      sx={sxContainer}
      isSync
      options={optionProvinces}
      loading={isLoadingListProvince}
    />
  );
};

export default AutoCompleteProvince;
