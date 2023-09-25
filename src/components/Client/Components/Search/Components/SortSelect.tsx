import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Field } from 'formik';

import { useTheme } from '@mui/material';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import CommonIcons from 'components/Client/CommonIcons';
import CustomFields from 'components/CustomFields';
import useConstants from 'hooks/useConstants';

interface SortSelectProps {}

const SelectUI = () => {
  const theme = useTheme();

  const { optionSortBy } = useConstants();
  const [openSelect, setOpenSelect] = useState(false);

  return (
    <CommonStylesClient.Box sx={{ display: 'flex', gap: '4px', alignItems: 'center', width: 75 }}>
      <Field
        name='sortby'
        placeholder={'Recent'}
        component={CustomFields.SelectField}
        options={optionSortBy}
        fullWidth
        open={openSelect}
        onOpen={() => setOpenSelect(true)}
        onClose={() => setOpenSelect(false)}
        sx={{
          boxShadow: 'none',
          width: 'fit-content',
          '.MuiSelect-select': {
            width: 'fit-content',
            paddingRight: '4px',
            padding: '0 !important',
            fontSize: '0.75rem',
            fontWeight: 500,
            lineHeight: '160%',
            letterSpacing: '0.03rem',
            color: theme.colors?.client?.darkGray,
          },

          '.MuiOutlinedInput-notchedOutline': { border: 0 },
          '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            border: 0,
          },
          '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: 0,
          },
          '& .icon-chevron-down': {
            transform: 'translateY(2px)',
            '&:hover': {
              cursor: 'pointer',
            },
          },
        }}
        IconComponent={() => {
          return (
            <CommonStylesClient.Box
              className='icon-chevron-down'
              onClick={() => {
                setOpenSelect(true);
              }}
            >
              <CommonIcons.IconChevronDown />
            </CommonStylesClient.Box>
          );
        }}
      />
    </CommonStylesClient.Box>
  );
};

const SortSelect = (props: SortSelectProps) => {
  //! State
  const theme = useTheme();
  const t = useTranslations('TourPage');
  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        borderRadius: '1rem',
        border: `1px solid ${theme.colors?.client.gray}`,
        display: 'flex',
        justifyContent: 'space-between',
        gap: '0.5rem',
        padding: '0.75rem 1rem',
        height: 48,
      }}
    >
      <CommonStylesClient.Box
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}
      >
        <CommonIcons.IconChart />
        <CommonStylesClient.Typography
          type='text14'
          sx={{ color: theme.colors?.client?.midBlack, width: '100%' }}
        >
          {t('sortBy')}
        </CommonStylesClient.Typography>
      </CommonStylesClient.Box>

      {/* SELECT FIELD */}
      <SelectUI />
    </CommonStylesClient.Box>
  );
};

export default React.memo(SortSelect);
