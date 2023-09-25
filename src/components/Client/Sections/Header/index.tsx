'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from '@mui/material';
import { RouterBase } from 'interfaces/common';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import { usePathname, useRouter } from 'next/navigation';
import pageUrls from 'constants/pageUrls';
import CommonIcons from 'components/CommonIcons';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { LOGO_IMAGE_PATH, MAX_HEIGHT_NAVBAR, MAX_WIDTH_CONTAINER } from 'constants/common';
import router from 'routes/router';
import OptionsLang from 'components/OptionsLang';
import { removeLangFromPathname } from 'helpers/common';
import useAuth from 'hooks/useAuth';

const Header = () => {
  const t = useTranslations('Routes');
  const tIndex = useTranslations('Index');
  const theme = useTheme();
  const pathName = usePathname();
  const route = useRouter();
  const auth = useAuth();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleNavigateHomepage = () => {
    route.push(pageUrls.Homepage);
  };
  const renderRouter = (drawer?: boolean) => {
    return (
      <CommonStylesClient.Box
        sx={{
          display: { xs: drawer ? 'flex' : 'none', lg: 'flex' },
          maxWidth: '370px',
          flexDirection: drawer ? 'column' : undefined,
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {router()
          .routerUser?.filter((itemFilter: RouterBase) => itemFilter.showTab === true)
          .map((item: RouterBase, index: number) => {
            const label = item.label;
            const path = item.path;
            const isActive = removeLangFromPathname(pathName) === path;
            return (
              <Link
                key={index}
                href={path}
                style={{ textDecoration: 'none', color: theme.colors?.black }}
              >
                <CommonStylesClient.Typography
                  type='title16'
                  sx={{
                    color: !!isActive ? theme.colors?.primary500 : theme.colors?.bgneutral500,
                    fontWeight: !!isActive ? 'bold' : 300,
                  }}
                >
                  {label}
                </CommonStylesClient.Typography>
              </Link>
            );
          })}
      </CommonStylesClient.Box>
    );
  };

  const renderIconAndRoute = () => {
    const renderLogo = () => {
      return (
        <CommonStylesClient.Box
          onClick={handleNavigateHomepage}
          sx={{ width: { lg: '20rem', xs: '15rem', cursor: 'pointer' } }}
        >
          <img src={LOGO_IMAGE_PATH.src} alt='logo' style={{ width: '75px', height: '75px' }} />
        </CommonStylesClient.Box>
      );
    };

    return (
      <CommonStylesClient.Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        {renderLogo()}
        {renderRouter()}

        <CommonStylesClient.Box sx={{ height: '3rem', display: 'flex', alignItems: 'center' }}>
          <CommonStylesClient.Divider
            orientation='vertical'
            variant='middle'
            flexItem
            sx={{
              display: { xs: 'none', lg: 'block' },
            }}
          />
          <OptionsLang />
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>
    );
  };

  const renderSwitchLangAndBtnLogin = () => {
    return (
      <CommonStylesClient.Box
        sx={{
          display: { xs: 'none', lg: 'flex' },
          alignItems: 'center',
          maxWidth: 'fit-content',
          width: '100%',
        }}
      >
        <CommonStylesClient.AccountMenu />
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
          display: { lg: 'none' },
          p: 0,
          [theme.breakpoints.down('sm')]: {
            mr: 2,
            p: 0,
          },
        }}
        onClick={handleDrawerToggle}
      >
        <CommonIcons.MenuIcon />
      </CommonStylesClient.Button>
    );
  };

  const renderDrawer = () => {
    return (
      <CommonStylesClient.Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          gap: 3,
          width: '100%',
          padding: '1.5em',
          textAlign: 'center',
        }}
        onClick={handleDrawerToggle}
      >
        {renderRouter(true)}
      </CommonStylesClient.Box>
    );
  };

  return (
    <CommonStylesClient.Box>
      <AppBar
        component='nav'
        sx={{
          height: MAX_HEIGHT_NAVBAR,
          [theme.breakpoints.down('sm')]: {
            height: '4rem',
          },
          background: theme.colors?.white,
          boxShadow: `rgba(50, 50, 105, 0.12) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px`,
        }}
      >
        <CommonStylesClient.Toolbar
          className='container'
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: MAX_WIDTH_CONTAINER,
            margin: 'auto',
            padding: '1.5rem 0',
            [theme.breakpoints.down('sm')]: {
              padding: '1rem 0',
            },
            [theme.breakpoints.up('sm')]: {
              padding: 0,
            },
          }}
        >
          {renderIconAndRoute()}
          {renderSwitchLangAndBtnLogin()}
          {renderMenuIcon()}
        </CommonStylesClient.Toolbar>
      </AppBar>
      <CommonStylesClient.Box component='nav'>
        <Drawer
          anchor='right'
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          transitionDuration={50}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '15rem' },
          }}
        >
          {renderDrawer()}
        </Drawer>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default Header;
