'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { usePathname, useRouter } from 'next/navigation';
import CommonIcons from 'components/CommonIconsMui';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import useAuth from 'hooks/useAuth';
import SearchAndFilters from 'components/SearchAndFilters';
import FormikField from 'components/FormikField';
import CustomFields from 'components/CustomFields';
import { RenderConntentSidebar } from '../../SidebarHome';
import useCheckResolution from 'hooks/useCheckResolution';

export interface SearchAndFiltersProps {
  textSearch?: string;
}
const HeaderTablet = () => {
  //! State
  const t = useTranslations();
  const theme = useTheme();
  const pathName = usePathname();
  const route = useRouter();
  const auth = useAuth();
  const { isTablet } = useCheckResolution();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const initialSearch: SearchAndFiltersProps = {
    textSearch: '',
  };
  //! Function
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const renderDrawer = () => {
    return (
      <CommonStylesClient.Box onClick={handleDrawerToggle}>
        <RenderConntentSidebar isOpenDrawer={mobileOpen} />
      </CommonStylesClient.Box>
    );
  };

  const renderMenuIcon = () => {
    return (
      <CommonStylesClient.Button
        isIconButton
        aria-label='open drawer'
        edge='end'
        sx={{
          color: theme.colors?.black,
          cursor: 'pointer',
        }}
        onClick={handleDrawerToggle}
      >
        <CommonIcons.MenuIcon />
      </CommonStylesClient.Button>
    );
  };

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
  return (
    <CommonStylesClient.Box>
      <CommonStylesClient.Box component='nav'>
        <CommonStylesClient.Box
          sx={{ display: 'flex', justifyContent: 'space-between', margin: '1rem' }}
        >
          <CommonStylesClient.Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
            {renderMenuIcon()}
            <CommonStylesClient.Typography type='pcHeading3'>
              Mediwey magazine
            </CommonStylesClient.Typography>
          </CommonStylesClient.Box>
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
        <Drawer
          anchor='left'
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          transitionDuration={50}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: '17rem',
              backgroundColor: `${theme?.colors?.bggray200}`,
            },
          }}
        >
          {renderDrawer()}
        </Drawer>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default HeaderTablet;
