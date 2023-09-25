import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useLocale, useTranslations } from 'next-intl';
import { Lang } from 'i18nOptions';
import { usePathname, useRouter } from 'next/navigation';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { useTheme } from '@mui/material';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { removeLangFromPathname } from 'helpers/common';
import { useGet, useSave } from 'stores/useStore';
import cachedKeys from 'constants/cachedKeys';

const OptionsLang = () => {
  //! State
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const languages: Lang[] = useGet(cachedKeys.languagesArr);
  const saveLanguage = useSave();
  const open = Boolean(anchorEl);
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const theme = useTheme();

  //! Function
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [lang, setLang] = useState(locale);
  const handleSwitchLang = (href: string, selectedLang: Lang) => {
    const selectedIndex = languages.indexOf(selectedLang);
    setLang(selectedLang);
    if (selectedIndex !== -1) {
      const newLanguages = [...languages];
      newLanguages.splice(selectedIndex, 1);
      newLanguages.unshift(selectedLang);
      saveLanguage(cachedKeys.languagesArr, newLanguages);
    }
    return router.push(href);
  };

  //! Render
  return (
    <CommonStylesClient.Box sx={{ paddingRight: '2rem' }}>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<CommonIcons.ArrowDownIcon />}
        sx={{
          textTransform: 'capitalize',
          fontSize: '1rem',
          width: 'max-content',
          color: theme.colors?.client.midBlack,
          p: 0,
        }}
      >
        <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
          <CommonStyles.Avatar
            sx={{ width: '1.875rem', height: '1.875rem', backgroundColor: 'transparent' }}
          >
            {lang === Lang.en && <CommonIcons.UnitedKingdom />}
            {lang === Lang.vi && <CommonIcons.Vietnamese />}
          </CommonStyles.Avatar>
          {t('switchLocale', { locale: lang })}
        </CommonStyles.Box>
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {languages.map((lang) => {
          const nextPathName = `/${lang}${removeLangFromPathname(pathname)}`;

          return (
            <MenuItem onClick={() => handleSwitchLang(nextPathName, lang)} key={lang}>
              <CommonStylesClient.Box
                sx={{ display: 'flex', alignItems: 'center', columnGap: 1, mt: 1 }}
              >
                <CommonStyles.Avatar
                  sx={{ width: '1.875rem', height: '1.875rem', backgroundColor: 'transparent' }}
                >
                  {lang === Lang.en && <CommonIcons.UnitedKingdom />}
                  {lang === Lang.vi && <CommonIcons.Vietnamese />}
                </CommonStyles.Avatar>
                <CommonStylesClient.Typography sx={{ fontSize: '1rem' }}>
                  {t('switchLocale', { locale: lang })}
                </CommonStylesClient.Typography>
              </CommonStylesClient.Box>
            </MenuItem>
          );
        })}
      </Menu>
    </CommonStylesClient.Box>
  );
};

export default OptionsLang;
