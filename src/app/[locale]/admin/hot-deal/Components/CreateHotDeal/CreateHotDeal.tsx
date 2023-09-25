'use client';

import CommonStyles from 'components/CommonStyles';
import React from 'react';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Vendor } from 'modules/vendor/vendor.interface';
import { HotDeal } from 'modules/hotDeal/hotDeal.interface';
import Content from './Content/Content';

interface ICreateVendor {
  hotDeal?: HotDeal;
  toggle: () => void;
}

export default function CreateVendor(props: ICreateVendor) {
  //! State
  const { hotDeal, toggle } = props;
  const theme = useTheme();
  const t = useTranslations();

  //! Function

  //! Render
  return (
    <CommonStyles.Box sx={{ display: 'flex', gap: 2 }}>
      <Content hotDeal={hotDeal} toggle={toggle} />
    </CommonStyles.Box>
  );
}
