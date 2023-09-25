import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { styled, useTheme, Theme, CSSObject, IconButton } from '@mui/material';
import List from '@mui/material/List';
import MuiDrawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { RouterBase } from 'interfaces/common';
import { isEmpty } from 'lodash';
import NestListItem from './NestListItem';

interface NavbarProps {
  drawerWidth: number;
  router: RouterBase[];
  handleMiniDrawerToggle: () => void;
  miniDrawer: boolean;
}

const Navbar = (props: NavbarProps) => {
  const { drawerWidth, router, handleMiniDrawerToggle, miniDrawer } = props;
  //! State
  const t = useTranslations('Routes');
  const theme = useTheme();

  //! Function
  const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });

  const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    })
  );

  //! Render
  const drawer = (
    <CommonStyles.Box>
      <CommonStyles.Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
        <CommonIcons.Users sx={{ color: theme.colors?.white }} />
        <CommonStyles.Typography
          sx={{
            color: theme.colors?.white,
            fontWeight: 'bold',
            fontSize: '1em',
            padding: '0 1em',
            display: miniDrawer ? 'block' : 'none',
          }}
        >
          Logo
        </CommonStyles.Typography>
      </CommonStyles.Toolbar>
      <CommonStyles.Divider sx={{ background: theme.colors?.white }} />
      <CommonStyles.Box>
        <List>
          {router.map((item: RouterBase, index: number) => {
            const label = item.label;
            const path = item.path;
            const icon = item.icon;
            if (!isEmpty(item.children)) {
              return (
                <NestListItem
                  key={item?.label}
                  label={label}
                  icon={icon}
                  path={path}
                  // eslint-disable-next-line react/no-children-prop
                  children={item.children}
                  miniDrawer={miniDrawer}
                />
              );
            }
            return (
              <Link href={path} style={{ textDecoration: 'none' }} key={item?.label}>
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: miniDrawer ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: theme.colors?.white,
                        minWidth: '2.5em',
                        mr: miniDrawer ? 0 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        color: theme.colors?.white,
                        opacity: miniDrawer ? 1 : 0,
                        ['span']: { fontSize: '0.85em' },
                      }}
                      primary={label}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            );
          })}
        </List>
      </CommonStyles.Box>
    </CommonStyles.Box>
  );

  return (
    <CommonStyles.Box component='nav' sx={{ flexShrink: { md: 0 } }}>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        variant='permanent'
        sx={{
          display: { md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            background: theme.colors?.blueDefault,
            backgroundImage: `linear-gradient(180deg,${theme.colors?.blue700} 10%,${theme.colors?.blue500} 100%)`,
          },
        }}
        open={miniDrawer}
      >
        {drawer}
        <CommonStyles.Divider sx={{ background: theme.colors?.white }} />
        <DrawerHeader>
          <IconButton onClick={handleMiniDrawerToggle} sx={{ color: theme.colors?.white }}>
            {miniDrawer ? <CommonIcons.LeftIcon /> : <CommonIcons.RightIcon />}
          </IconButton>
        </DrawerHeader>
      </Drawer>
    </CommonStyles.Box>
  );
};

export default React.memo(Navbar);
