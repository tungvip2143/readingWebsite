import React, { useState } from 'react';
import { useTheme } from '@mui/material';
import { Field } from 'formik';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import CommonIcons from 'components/Client/CommonIcons';
import CustomFields from 'components/CustomFields';
import useConstants from 'hooks/useConstants';
import { convertToFormSelect } from 'helpers/common';
import useGetListProvinceDetail from 'modules/province/hooks/useGetListProvinceDetail';
import CommonStyles from 'components/CommonStyles';
import { useTranslations } from 'next-intl';

interface LocationSelectProps {
  afterOnChangeSelect?: (value: number) => void;
}
interface SelectProps {
  afterOnChangeSelect?: (value: number) => void;
}

const SelectLocation = (props: SelectProps) => {
  //! State
  const theme = useTheme();
  const t = useTranslations();
  const [openSelect, setOpenSelect] = useState(false);
  const { data, isLoading } = useGetListProvinceDetail();

  const allLocation = [
    {
      label: t('Index.allLocation'),
      value: '',
    },
  ];

  const optionProvinces = allLocation.concat(
    convertToFormSelect(data, 'name', 'code')?.map((el) => ({
      ...el,
      value: el?.value,
    }))
  );
  //! Function

  //! Render
  if (isLoading) {
    <CommonStyles.Loading />;
  }

  return (
    <CommonStylesClient.Box
      sx={{ display: 'flex', flexDirection: 'row', gap: '0.75rem', width: '100%' }}
    >
      <Field
        placeholder={t('Index.selectLocation')}
        name='provinceCode'
        component={CustomFields.SelectField}
        options={optionProvinces}
        fullWidth
        open={openSelect}
        onOpen={() => setOpenSelect(true)}
        onClose={() => setOpenSelect(false)}
        sxContainer={{
          width: '100%',
        }}
        afterOnChange={props.afterOnChangeSelect}
        sx={{
          '.MuiSelect-select': {
            padding: 0,
            fontSize: '1rem',
            fontWeight: 700,
            lineHeight: '24px',
            color: theme.colors?.client?.midBlack,
          },
          '.MuiOutlinedInput-notchedOutline': { border: 0 },
          '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            border: 0,
          },
          '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: 0,
          },
          '& .icon-arrow-down': {
            transform: 'translateY(-10px)',
            '&:hover': {
              cursor: 'pointer',
            },
          },
        }}
        text={
          <CommonStylesClient.Typography type='text12' sx={{ color: theme.colors?.client?.gray }}>
            {t('Index.location')}
          </CommonStylesClient.Typography>
        }
        IconComponent={() => {
          return (
            <CommonStylesClient.Box
              className='icon-arrow-down'
              onClick={() => {
                setOpenSelect(true);
              }}
            >
              <CommonIcons.IconArrowDownBlue />
            </CommonStylesClient.Box>
          );
        }}
      />
    </CommonStylesClient.Box>
  );
};

const LocationSelect = (props: LocationSelectProps) => {
  //! State
  const theme = useTheme();

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box>
      <CommonStylesClient.Box
        sx={{
          padding: '0.75rem 0 1rem 0',
          borderBottom: `1px solid ${theme.colors?.client?.midGray}`,
          display: 'flex',
          gap: '0.75rem',
        }}
      >
        <CommonIcons.IconLocationRed />

        <SelectLocation afterOnChangeSelect={props.afterOnChangeSelect} />
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(LocationSelect);
