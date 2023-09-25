import React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
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
import { IMG_URL } from 'constants/apiUrls';
import { usePathname } from 'next/navigation';
import { LOGO_IMAGE_PATH } from 'constants/common';
import { Lang } from 'i18nOptions';

interface NavbarProps {
  drawerWidth: number;
  router: RouterBase[];
  handleMiniDrawerToggle: () => void;
  miniDrawer: boolean;
}

const Navbar = (props: NavbarProps) => {
  const { drawerWidth, router, handleMiniDrawerToggle, miniDrawer } = props;
  //! State
  const t = useTranslations();
  const theme = useTheme();
  const pathname = usePathname();
  const locale = useLocale();

  const pathnameParsed = locale === Lang.en ? pathname.slice(3) : pathname;

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
    width: `calc(${theme.spacing(7)})`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)})`,
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
      {miniDrawer ? (
        <CommonStyles.Toolbar
          sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <CommonStyles.Box sx={{ paddingTop: '1.25rem', marginBottom: '1.125rem' }}>
            <img
              src={LOGO_IMAGE_PATH.src}
              alt='Logo Got U'
              style={{ width: '100%', height: '50px' }}
            />
          </CommonStyles.Box>

          <CommonStyles.Typography
            variant='subtitle2'
            sx={{
              fontSize: '0.625rem',
              letterSpacing: '0.025rem',
              fontWeight: 400,
              color: theme.colors?.client.blackSubtitle,
            }}
          >
            {t('LocalFriendHomepage.forLocalFriend')}
          </CommonStyles.Typography>
        </CommonStyles.Toolbar>
      ) : null}

      <CommonStyles.Box sx={{ paddingTop: miniDrawer ? '2.5rem' : '5rem' }}>
        <List sx={miniDrawer ? {} : { padding: 0 }}>
          {router.map((item: RouterBase, index: number) => {
            const label = item.label;
            const path = item.path;
            const icon = item.icon;
            if (!isEmpty(item.children)) {
              return (
                <NestListItem
                  key={label}
                  label={label}
                  icon={icon}
                  path={path}
                  childRoute={item.children}
                  miniDrawer={miniDrawer}
                />
              );
            }
            return (
              <Link key={label} href={path} style={{ textDecoration: 'none' }}>
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: miniDrawer ? 'initial' : 'center',
                      padding: miniDrawer ? '0 1.75rem' : 0,
                      '&:hover': {
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    {miniDrawer ? (
                      <CommonStyles.Box
                        sx={
                          path === pathnameParsed
                            ? {
                                padding: '0 1.25rem',
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                height: '3rem',
                                backgroundColor: theme.colors?.client.lightBlue,
                                borderRadius: '0.75rem',
                              }
                            : {
                                padding: '0 1.25rem',
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                height: '3rem',
                              }
                        }
                      >
                        <ListItemIcon
                          sx={
                            path === pathnameParsed
                              ? {
                                  '& svg path': {
                                    fill: `${theme.colors?.client.coBaltBlue} !important`,
                                  },
                                  minWidth: 0,
                                  marginRight: '1rem',
                                  justifyContent: 'center',
                                }
                              : {
                                  color: theme.colors?.white,
                                  minWidth: 0,
                                  marginRight: '1rem',
                                  justifyContent: 'center',
                                }
                          }
                        >
                          {icon}
                        </ListItemIcon>

                        {miniDrawer && (
                          <ListItemText
                            sx={
                              path === pathnameParsed
                                ? {
                                    color: theme.colors?.client.coBaltBlue,
                                    opacity: miniDrawer ? 1 : 0,
                                    '& span': {
                                      fontSize: '0.875rem',
                                      fontWeight: 500,
                                      letterSpacing: '0.035rem',
                                      display: 'block',
                                      wordWrap: 'break-word',
                                      width: '100%',
                                      whiteSpace: 'normal',
                                    },
                                  }
                                : {
                                    color: theme.colors?.client.darkGray,
                                    opacity: miniDrawer ? 1 : 0,
                                    '& span': {
                                      fontSize: '0.875rem',
                                      fontWeight: 500,
                                      letterSpacing: '0.035rem',
                                      display: 'block',
                                      wordWrap: 'break-word',
                                      width: '100%',
                                      whiteSpace: 'normal',
                                    },
                                  }
                            }
                            primary={label}
                          />
                        )}
                      </CommonStyles.Box>
                    ) : (
                      <ListItemIcon
                        sx={
                          path === pathnameParsed
                            ? {
                                '& svg path': {
                                  fill: `${theme.colors?.client.coBaltBlue} !important`,
                                },
                                minWidth: 0,
                                justifyContent: 'center',
                              }
                            : {
                                color: theme.colors?.white,
                                minWidth: 0,
                                justifyContent: 'center',
                              }
                        }
                      >
                        {icon}
                      </ListItemIcon>
                    )}
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
        className='drawer-containter'
        sx={{
          display: { md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: miniDrawer ? '15.625rem' : '4rem',
            // background: theme.colors?.blueDefault,
            // backgroundImage: `linear-gradient(180deg,${theme.colors?.blue700} 10%,${theme.colors?.blue500} 100%)`,
          },
        }}
        open={miniDrawer}
      >
        {drawer}

        <DrawerHeader
          className='div-drawer'
          sx={
            miniDrawer
              ? { padding: '0 1.75rem', justifyContent: 'center' }
              : { padding: 0, justifyContent: 'center' }
          }
        >
          <IconButton
            onClick={handleMiniDrawerToggle}
            sx={{ color: theme.colors?.client.darkGray }}
          >
            {miniDrawer ? <CommonIcons.LeftIcon /> : <CommonIcons.RightIcon />}
          </IconButton>
        </DrawerHeader>
      </Drawer>
    </CommonStyles.Box>
  );
};

export default React.memo(Navbar);
