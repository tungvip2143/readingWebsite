import React from 'react';
import Collapse from '@mui/material/Collapse';
import { useTheme } from '@mui/material';
import List from '@mui/material/List';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import CommonIcons from 'components/CommonIcons';
import { RouterBaseChild } from 'interfaces/common';
import Link from 'next/link';
import CommonStyles from 'components/CommonStyles';

interface NestListItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  childRoute: RouterBaseChild[] | undefined;
  miniDrawer: boolean;
}

const NestListItem = (props: NestListItem) => {
  const { icon, label, path, childRoute, miniDrawer } = props;
  //! State
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  //! Function
  const handleClick = () => {
    setOpen(!open);
  };

  //! Effect

  //! Render
  return (
    <>
      <>
        <ListItemButton
          onClick={handleClick}
          sx={{ minHeight: 48, justifyContent: miniDrawer ? 'space-between' : 'center', px: 2.5 }}
        >
          <CommonStyles.Box>
            <Link
              href={path}
              style={{
                textDecoration: 'none',
                display: 'flex',
                justifyContent: miniDrawer ? 'initial' : 'center',
                width: '100%',
              }}
            >
              <ListItemIcon
                sx={{
                  color: theme.colors?.white,
                  minWidth: '2.5em',
                  justifyContent: 'center',
                }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText
                sx={{
                  display: miniDrawer ? 'block' : 'none',
                  color: theme.colors?.white,
                  opacity: miniDrawer ? 1 : 0,
                  ['span']: { fontSize: '0.85em' },
                }}
                primary={label}
              />
            </Link>
          </CommonStyles.Box>
          <CommonStyles.Box>
            {miniDrawer && (
              <>
                {open ? (
                  <CommonIcons.ExpandLess
                    sx={{
                      color: theme.colors?.white,
                    }}
                  />
                ) : (
                  <CommonIcons.ExpandMore
                    sx={{
                      color: theme.colors?.white,
                    }}
                  />
                )}
              </>
            )}
          </CommonStyles.Box>
        </ListItemButton>
      </>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {childRoute &&
            childRoute.map((item: RouterBaseChild, index: number) => {
              const labelChild = item.label;
              const pathChild = item.path;
              const iconChild = item.icon;
              return (
                <Link
                  href={pathChild}
                  style={{ textDecoration: 'none' }}
                  key={`${item?.label}_${index}`}
                >
                  <ListItem key={index} disablePadding>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        px: 2.5,
                        pl: miniDrawer ? 4 : 2.5,
                        justifyContent: miniDrawer ? 'initial' : 'center',
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: theme.colors?.white,
                          minWidth: '2.5em',
                          justifyContent: 'center',
                        }}
                      >
                        {iconChild}
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          color: theme.colors?.white,
                          ['span']: { fontSize: '0.85em' },
                          opacity: miniDrawer ? 1 : 0,
                        }}
                        primary={labelChild}
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
              );
            })}
        </List>
      </Collapse>
    </>
  );
};

export default NestListItem;
