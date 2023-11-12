'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { AppBar, useTheme } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import CommonIcons from 'components/CommonIconsMui';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import useAuth from 'hooks/useAuth';
import SearchAndFilters from 'components/SearchAndFilters';
import FormikField from 'components/FormikField';
import CustomFields from 'components/CustomFields';
import useCheckResolution from 'hooks/useCheckResolution';
import HeaderTablet from './TabletScreen';
import Link from 'next/link';
import { LOGO_IMAGE_PATH } from 'constants/common';

export interface SearchAndFiltersProps {
  textSearch?: string;
}
const Header = () => {
  //! State
  const t = useTranslations();
  const theme = useTheme();
  const pathName = usePathname();
  const route = useRouter();
  const auth = useAuth();
  const { isTablet } = useCheckResolution();

  const initialSearch: SearchAndFiltersProps = {
    textSearch: '',
  };
  //! Function

  const ButtonSearch = ({ textSearch }: SearchAndFiltersProps) => {
    const isHaveTextSearch = !!textSearch;
    return (
      <CommonStylesClient.Button
        sx={{
          backgroundColor: isHaveTextSearch ? ' rgb(255 255 255)' : `${theme?.colors?.bggray200}`,
          boxShadow: isHaveTextSearch ? '0px 0px 5px 1px rgba(0,0,0,0.1)' : 'none',
          borderRadius: '2rem',
          padding: '0.375rem 0.75rem',
          height: '2rem',
          '&:hover': {
            backgroundColor: isHaveTextSearch ? ' rgb(255 255 255)' : `${theme?.colors?.bggray200}`,
            boxShadow: isHaveTextSearch ? '0px 0px 5px 1px rgba(0,0,0,0.1)' : 'none',
          },
        }}
        type='submit'
        disabled={!isHaveTextSearch}
      >
        <CommonStylesClient.Typography
          type='title10'
          sx={{
            color: isHaveTextSearch ? `${theme?.colors?.bgblack}` : `${theme?.colors?.bggray400}`,
          }}
        >
          {t('Common.search')}
        </CommonStylesClient.Typography>
      </CommonStylesClient.Button>
    );
  };
  //! Render
  if (isTablet) {
    return <HeaderTablet />;
  }
  return (
    <CommonStylesClient.Box>
      <AppBar elevation={1} component='nav' sx={{ backgroundColor: 'rgb(255 255 255)' }}>
        <CommonStylesClient.Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link
            href='/'
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <img
              src={LOGO_IMAGE_PATH.src}
              alt='logo'
              style={{ width: '4.5rem', height: '4.5rem', marginLeft: '1rem' }}
            />
            <CommonStylesClient.Typography type='pcHeading3'>
              Mediwey magazine
            </CommonStylesClient.Typography>
          </Link>

          <CommonStylesClient.Box sx={{}}>
            <SearchAndFilters
              hideResetButton
              hideDefaultSubmit
              styleWrapperForm={{ flex: 1 }}
              initialValues={initialSearch}
              onSubmit={(values) => {
                console.log(values);
              }}
              sxContainer={{ display: 'flex', justifyContent: 'space-between' }}
              renderFilterFields={(props) => {
                const values: SearchAndFiltersProps = props?.values;
                return (
                  <CommonStylesClient.Box sx={{ gap: 2, display: 'flex', flex: 1 }}>
                    <FormikField
                      component={CustomFields.TextField}
                      name='textSearch'
                      placeholder={t('Common.search')}
                      iconStartInput={<CommonIcons.Search />}
                      iconEndInput={<ButtonSearch textSearch={values?.textSearch} />}
                      sx={{
                        width: '25rem ',
                        backgroundColor: 'rgb(242 243 245)',
                        borderRadius: '1rem',
                        '& div': {
                          borderRadius: '1rem',
                          '&.Mui-focused fieldset ': {
                            borderColor: 'rgb(41 41 41) !important',
                            boderWidth: '2px !important',
                          },
                        },
                      }}
                      sxEndAdornment={{ transform: 'translateX(0.5rem)' }}
                      size='small'
                    />
                  </CommonStylesClient.Box>
                );
              }}
            />
          </CommonStylesClient.Box>
        </CommonStylesClient.Box>
      </AppBar>
    </CommonStylesClient.Box>
  );
};

export default Header;
