'use client';

import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from '@mui/material';
import CommonStyles from 'components/CommonStyles';
import Navbar from './components/Navbar';
import Header from './components/Header';
import { RouterBase } from 'interfaces/common';
import { debounce } from 'lodash';

interface DefaultLayoutMerchant {
  children: React.ReactNode;
  header: React.ReactNode;
  router: RouterBase[];
  isHiddenNavbar?: boolean;
}

const drawerWidth = 250;

const DefaultLayoutMerchant = (props: DefaultLayoutMerchant) => {
  const { children, router, header, isHiddenNavbar = false } = props;
  const theme = useTheme();
  //! State
  const [miniDrawer, setMiniDrawer] = React.useState(true);
  const [windowSize, setWindowSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  //! Function
  const handleMiniDrawerToggle = () => {
    setMiniDrawer(!miniDrawer);
  };

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
    if (windowSize.width < theme.breakpoints.values.md) {
      setMiniDrawer(false);
      return;
    }
    return setMiniDrawer(true);
  }, [windowSize]);
  //! Render

  return (
    <div>
      <CommonStyles.Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header
          drawerWidth={isHiddenNavbar ? 0 : drawerWidth}
          header={header}
          miniDrawer={miniDrawer}
        />
        {!isHiddenNavbar && (
          <Navbar
            drawerWidth={drawerWidth}
            router={router}
            handleMiniDrawerToggle={handleMiniDrawerToggle}
            miniDrawer={miniDrawer}
          />
        )}
        {/*  */}
        <CommonStyles.Box
          component='main'
          sx={{
            flexGrow: 1,
            background: theme.colors?.client.grayBackground,
            height: '100%',
          }}
        >
          <CommonStyles.Toolbar />
          {children}
        </CommonStyles.Box>
      </CommonStyles.Box>
    </div>
  );
};

export default DefaultLayoutMerchant;
