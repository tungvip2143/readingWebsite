import React from 'react';
import { useTheme } from '@mui/material';
import { FastField } from 'formik';
import { useTranslations } from 'next-intl';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import CustomFields from 'components/CustomFields';
import CommonIcons from 'components/Client/CommonIcons';
import { convertToFormSelect } from 'helpers/common';
import useGetListAreas from 'modules/province/hooks/useGetListAreas';
import useGetListProvinceDetail from 'modules/province/hooks/useGetListProvinceDetail';
interface LocationSelectProps {}

const LocationSelect = (props: LocationSelectProps) => {
  //! State
  const theme = useTheme();
  const t = useTranslations('FindTour');
  const { data, isLoading } = useGetListProvinceDetail();
  const optionProvinces = convertToFormSelect(data, 'name', 'code') || [];

  //! Function

  //! Render
  if (isLoading) {
    return <CommonStylesClient.Loading />;
  }
  return (
    <CommonStylesClient.Box sx={{ display: 'flex', flexDirection: 'row', gap: '0.75rem' }}>
      <CommonIcons.IconLocation />
      <FastField
        name='location'
        placeholder={'Choose destinations'}
        component={CustomFields.SelectField}
        options={optionProvinces}
        fullWidth
        sxSelect={{
          padding: 0,
          boxShadow: 'none',
          '.MuiSelect-select': {
            padding: 0,
            h6: {
              fontSize: '0.875rem',
              fontWeight: 400,
              lineHeight: '1.4rem',
              color: theme.colors?.client?.gray,
            },
          },
          '.MuiOutlinedInput-notchedOutline': { border: 0 },
          '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            border: 0,
          },
          '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: 0,
          },
        }}
        text={
          <CommonStylesClient.Typography type='title16' sx={{ marginBottom: '4px' }}>
            {t('location')}
          </CommonStylesClient.Typography>
        }
        IconComponent={() => {}}
      />
    </CommonStylesClient.Box>
  );
};

export default React.memo(LocationSelect);
