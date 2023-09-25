import { useTheme } from '@mui/material';
import CommonStyles from 'components/CommonStyles';
import { useFormikContext } from 'formik';
import React from 'react';
import { fileToString } from 'helpers/common';
import { FormValuesHotDeal } from '../Content';
import { File } from 'constants/common';
import { useTranslations } from 'next-intl';
import FormikField from 'components/FormikField';

export default function Banner() {
  //! State
  const theme = useTheme();
  const t = useTranslations();
  const { values, setFieldValue } = useFormikContext<FormValuesHotDeal>();

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      sx={{
        padding: '2rem 1rem',
        border: `0.0625rem solid ${theme.colors?.bgneutral200}`,
        borderRadius: '0.25rem',
        width: 'calc(73% + 0.125rem)',
        marginBottom: '1rem',
      }}
    >
      <CommonStyles.Typography
        variant='h2'
        sx={{
          fontSize: '1.125rem',
          color: theme.colors?.custom?.textGrey,
          fontWeight: 500,
          marginBottom: '2rem',
        }}
      >
        {t('HotDeal.sidebarBanner')}
      </CommonStyles.Typography>

      <FormikField
        component={CommonStyles.PlaceholderUploadImage}
        name='bannerUrl'
        isHasDelete
        // disabled={isDisabled}
        renderChildren={
          !!values?.bannerUrl && (
            <CommonStyles.Box sx={{ width: '100%', maxWidth: '15rem' }}>
              <img
                style={{ width: '100%' }}
                alt='banner-placeholder'
                src={fileToString(values?.bannerUrl || '')}
              />
            </CommonStyles.Box>
          )
        }
      />
    </CommonStyles.Box>
  );
}
