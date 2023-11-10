'use client';

import React from 'react';
import { useTheme } from '@mui/material';

import { useLocale, useTranslations } from 'next-intl';
import { Lang } from 'i18nOptions';
import useCheckResolution from 'hooks/useCheckResolution';
import CommonStyles from 'components/CommonStyles';

const Footer = () => {
  //! State
  const theme = useTheme();
  const t = useTranslations();
  const locale = useLocale();
  const checkLangEnglish = locale === Lang.en;
  const { isTablet, isMobile } = useCheckResolution();
  //! Function

  //! Render
  return <CommonStyles.Box></CommonStyles.Box>;
};

export default Footer;
