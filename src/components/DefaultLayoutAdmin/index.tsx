'use client';

import React, { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from '@mui/material';
import { RouterBase } from 'interfaces/common';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import { usePathname, useRouter } from 'next/navigation';
import { debounce } from 'lodash';

import pageUrls from 'constants/pageUrls';
import CommonIcons from 'components/CommonIconsMui';
import CommonStyles from 'components/CommonStyles';
import { LOGO_IMAGE_PATH, Roles } from 'constants/common';
import router from 'routes/router';
import { removeLangFromPathname } from 'helpers/common';
import useAuth from 'hooks/useAuth';
import withPrivate from 'HOCs/withPrivate';
import withAuthorization from 'HOCs/withAuthorization';

function DefaultLayoutAdmin({ children }: { children: React.ReactNode }) {
  const t = useTranslations();

  const theme = useTheme();
  const pathName = usePathname();
  const route = useRouter();
  const auth = useAuth();

  //! State
  const [openMobile, setOpenMobile] = React.useState<boolean>(false);
  const [openDrawerMenu, setOpenDrawerMenu] = React.useState<boolean>(false);
  const [windowSize, setWindowSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  //! Function

  const handleDrawerToggle = () => {
    setOpenDrawerMenu(!openDrawerMenu);
  };

  const handleNavigate = () => {
    route.push(pageUrls.Admin);
  };
  const renderRouter = useCallback(() => {
    return router()
      .routerAdmin.filter((itemFilter: RouterBase) => itemFilter.showTab === true)
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
            <CommonStyles.Typography
              sx={{
                // color: !!isActive ? theme.colors?.primary500 : theme.colors?.bgneutral500,
                // fontWeight: !!isActive ? 'bold' : 300,
                color: false ? theme.colors?.primary500 : theme.colors?.bgneutral500,
                fontWeight: false ? 'bold' : 300,
                fontSize: '1em',
                lineHeight: '1.5em',
              }}
            >
              {label}
            </CommonStyles.Typography>
          </Link>
        );
      });
  }, [pathName]);

  //! Effect
  React.useEffect(() => {
    const handleResize = debounce(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 250);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    if (windowSize.width < theme.breakpoints.values.lg) {
      setOpenMobile(true);
      return;
    }
    return setOpenMobile(false);
  }, [windowSize]);

  //! Render
  const Header = () => {
    return (
      <AppBar
        sx={{
          background: theme.colors?.white,
          boxShadow: `rgba(50, 50, 105, 0.12) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px`,
        }}
      >
        <CommonStyles.Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            minHeight: '4.25em',
            padding: '0 1.5em',
            borderRadius: 0,
          }}
        >
          <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center', gap: 5, width: '100%' }}>
            {openMobile && (
              <CommonIcons.MenuIcon
                sx={{ color: theme.colors?.black, cursor: 'pointer' }}
                onClick={handleDrawerToggle}
              />
            )}
            <CommonStyles.Box onClick={handleNavigate} sx={{ cursor: 'pointer' }}>
              <img src={LOGO_IMAGE_PATH.src} alt='logo' style={{ width: '75px', height: '75px' }} />{' '}
            </CommonStyles.Box>
            {!openMobile && renderRouter()}

            {/*  */}
            <Drawer
              variant='temporary'
              open={openDrawerMenu}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
              }}
            >
              <CommonStyles.Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'left',
                  gap: 3,
                  width: '100%',
                  padding: '1.5em',
                }}
              >
                <img
                  src={LOGO_IMAGE_PATH.src}
                  alt='logo'
                  style={{ width: '75px', height: '75px' }}
                />{' '}
                <CommonStyles.Divider />
                {renderRouter()}
              </CommonStyles.Box>
            </Drawer>
          </CommonStyles.Box>
          <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {auth.isLogged ? (
              <CommonStyles.AccountMenu />
            ) : (
              <Link href={pageUrls.Login}>
                <CommonStyles.Button sx={{ width: 120, background: theme.colors?.primary500 }}>
                  {t('Common.search')}
                </CommonStyles.Button>
              </Link>
            )}
          </CommonStyles.Box>
        </CommonStyles.Box>
      </AppBar>
    );
  };

  return (
    <CommonStyles.Box sx={{ position: 'relative' }}>
      <Header />
      {children}
    </CommonStyles.Box>
  );
}

export default withPrivate(withAuthorization(DefaultLayoutAdmin, [Roles.ADMIN]));
