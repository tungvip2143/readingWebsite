import CommonStyles from 'components/CommonStyles';
import CustomFields from 'components/CustomFields';
import { FastField, useFormikContext } from 'formik';
import React from 'react';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FormValuesVendor } from '../../../Content';
import SelectDistrict from 'components/SelectDistrict';
import SelectWards from 'components/SelectWards';
import SelectPrefixPhone from 'components/SelectPrefixPhone';
import SelectProvinceDetail from 'components/SelectProvinceDetail';
import SelectListTypeVendor from 'components/SelectTypeVendor';

const General = () => {
  //! State
  const theme = useTheme();
  const t = useTranslations();
  const { values } = useFormikContext<FormValuesVendor>();

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      sx={{
        padding: '2rem 1rem',
        border: `0.0625rem solid ${theme.colors?.bgneutral200}`,
        borderRadius: '0.25rem',
        flex: 1,
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
        {t('Tour.generalInformation')}
      </CommonStyles.Typography>

      <CommonStyles.Box sx={{ marginBottom: '1rem' }}>
        <CommonStyles.Typography
          variant='h4'
          sx={{
            fontSize: '1.125rem',
            color: theme.colors?.custom?.textBlack,
            marginBottom: '0.5rem',
            fontWeight: 500,
          }}
        >
          {t('Vendor.name')}
        </CommonStyles.Typography>
        <FastField
          name='name'
          component={CustomFields.TextField}
          size='small'
          sx={{
            color: theme.colors?.custom?.textBlack,
            background: theme.colors?.bgneutral50,
          }}
          placeholder={t('Vendor.inputVendor')}
          fullWidth
        />
      </CommonStyles.Box>
      <CommonStyles.Box sx={{ marginBottom: '1rem' }}>
        <CommonStyles.Typography
          variant='h4'
          sx={{
            fontSize: '1.125rem',
            color: theme.colors?.custom?.textBlack,
            marginBottom: '0.5rem',
            fontWeight: 500,
          }}
        >
          {t('Vendor.email')}
        </CommonStyles.Typography>
        <FastField
          name='email'
          sx={{ background: theme.colors?.bgneutral50 }}
          component={CustomFields.TextField}
          size='small'
          fullWidth
        />
      </CommonStyles.Box>

      <CommonStyles.Box
        sx={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', gap: '1rem' }}
      >
        <CommonStyles.Box sx={{ width: '50%' }}>
          <CommonStyles.Typography
            variant='h4'
            sx={{
              fontSize: '1.125rem',
              color: theme.colors?.custom?.textBlack,
              marginBottom: '0.5rem',
              fontWeight: 500,
            }}
          >
            {t('Vendor.phoneCode')}
          </CommonStyles.Typography>
          <SelectPrefixPhone name='phoneCode' />
        </CommonStyles.Box>

        <CommonStyles.Box sx={{ width: '50%' }}>
          <CommonStyles.Typography
            variant='h4'
            sx={{
              fontSize: '1.125rem',
              color: theme.colors?.custom?.textBlack,
              marginBottom: '0.5rem',
              fontWeight: 500,
            }}
          >
            {t('Vendor.phone')}
          </CommonStyles.Typography>
          <FastField
            name='phone'
            sx={{ background: theme.colors?.bgneutral50 }}
            component={CustomFields.TextField}
            size='small'
            fullWidth
          />
        </CommonStyles.Box>
      </CommonStyles.Box>

      <CommonStyles.Box
        sx={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', gap: '1rem' }}
      >
        <CommonStyles.Box sx={{ width: '50%' }}>
          <CommonStyles.Typography
            variant='h4'
            sx={{
              fontSize: '1.125rem',
              color: theme.colors?.custom?.textBlack,
              marginBottom: '0.5rem',
              fontWeight: 500,
            }}
          >
            {t('Vendor.provinceCode')}
          </CommonStyles.Typography>
          <SelectProvinceDetail
            name='provinceCode'
            nameClearAfterChange={['districtCode', 'wardCode']}
            sxContainer={{ background: theme.colors?.bgneutral50 }}
          />
        </CommonStyles.Box>
        <CommonStyles.Box sx={{ width: '50%' }}>
          <CommonStyles.Typography
            variant='h4'
            sx={{
              fontSize: '1.125rem',
              color: theme.colors?.custom?.textBlack,
              marginBottom: '0.5rem',
              fontWeight: 500,
            }}
          >
            {t('Vendor.districtCode')}
          </CommonStyles.Typography>
          <SelectDistrict
            name='districtCode'
            provinceCode={values?.provinceCode!}
            sxContainer={{ background: theme.colors?.bgneutral50 }}
          />
        </CommonStyles.Box>
      </CommonStyles.Box>

      <CommonStyles.Box
        sx={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', gap: '1rem' }}
      >
        <CommonStyles.Box sx={{ width: '50%' }}>
          <CommonStyles.Typography
            variant='h4'
            sx={{
              fontSize: '1.125rem',
              color: theme.colors?.custom?.textBlack,
              marginBottom: '0.5rem',
              fontWeight: 500,
            }}
          >
            {t('Vendor.wardCode')}
          </CommonStyles.Typography>

          <SelectWards
            name='wardCode'
            districtCode={values?.districtCode!}
            sxContainer={{ background: theme.colors?.bgneutral50 }}
          />
        </CommonStyles.Box>
        <CommonStyles.Box sx={{ width: '50%' }}>
          <CommonStyles.Typography
            variant='h4'
            sx={{
              fontSize: '1.125rem',
              color: theme.colors?.custom?.textBlack,
              marginBottom: '0.5rem',
              fontWeight: 500,
            }}
          >
            {t('Vendor.typeVendor')}
          </CommonStyles.Typography>

          <SelectListTypeVendor
            name='vendorTypes'
            sxContainer={{ background: theme.colors?.bgneutral50 }}
            isMultiple
          />
        </CommonStyles.Box>
      </CommonStyles.Box>

      <CommonStyles.Box sx={{ marginBottom: '1rem' }}>
        <CommonStyles.Typography
          variant='h4'
          sx={{
            fontSize: '1.125rem',
            color: theme.colors?.custom?.textBlack,
            marginBottom: '0.5rem',
            fontWeight: 500,
          }}
        >
          {t('Vendor.fullAddress')}
        </CommonStyles.Typography>
        <FastField
          name='fullAddress'
          sx={{ background: theme.colors?.bgneutral50 }}
          component={CustomFields.TextField}
          size='small'
          fullWidth
        />
      </CommonStyles.Box>

      <CommonStyles.Box sx={{ marginBottom: '1rem' }}></CommonStyles.Box>

      <CommonStyles.Box sx={{ marginBottom: '1rem' }}>
        <CommonStyles.Typography
          variant='h4'
          sx={{
            fontSize: '1.125rem',
            color: theme.colors?.custom?.textBlack,
            marginBottom: '0.5rem',
            fontWeight: 500,
          }}
        >
          {t('Vendor.descriptionVendor')}
        </CommonStyles.Typography>
        <FastField
          name='description'
          component={CustomFields.Textarea}
          fullWidth
          sx={{ background: theme.colors?.bgneutral50 }}
        />
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default React.memo(General);
