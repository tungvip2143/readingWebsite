import * as React from 'react';
import { useTranslations } from 'next-intl';

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import CommonStyles from '.';
import CommonIcons from 'components/CommonIconsMui';
import useAuth from 'hooks/useAuth';

function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const t = useTranslations('Account');
  const auth = useAuth();

  //! Function
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    auth.signOut();
    setAnchorEl(null);
  };

  //! Render
  return (
    <React.Fragment>
      <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <CommonStyles.Tooltip title={t('accountSettings')}>
          <IconButton
            onClick={handleClick}
            size='small'
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar alt='' src='' sx={{ width: 36, height: 36 }} />
          </IconButton>
        </CommonStyles.Tooltip>
      </CommonStyles.Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> {t('profile')}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> {t('myAccount')}
        </MenuItem>
        <CommonStyles.Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <CommonIcons.SettingsIcon fontSize='small' />
          </ListItemIcon>
          {t('settings')}
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <CommonIcons.LogoutIcon fontSize='small' />
          </ListItemIcon>
          {t('logout')}
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default AccountMenu;
