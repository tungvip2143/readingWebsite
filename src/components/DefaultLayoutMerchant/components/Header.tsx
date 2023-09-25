'use client';
import React from 'react';
import CommonStyles from 'components/CommonStyles';
import { IconButton } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled, useTheme } from '@mui/material/styles';

interface HeaderProps {
  drawerWidth: number;
  header: React.ReactNode;
  miniDrawer: boolean;
}
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const Header = (props: HeaderProps) => {
  const { drawerWidth, header, miniDrawer } = props;
  //! State
  const theme = useTheme();
  //! Function
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
    width: `calc(100% - ${theme.spacing(8)})`,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  //! Render
  return (
    <AppBar
      position='fixed'
      sx={{
        background: theme.colors?.white,
        boxShadow: 'none',
      }}
      open={miniDrawer}
    >
      <CommonStyles.Toolbar sx={{ padding: '1.375rem 3.5rem !important' }}>
        {header}
      </CommonStyles.Toolbar>
    </AppBar>
  );
};

export default React.memo(Header);
