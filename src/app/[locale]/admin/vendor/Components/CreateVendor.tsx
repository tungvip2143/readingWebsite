'use client';

import CommonStyles from 'components/CommonStyles';
import React from 'react';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import Content from './Content';
import { Vendor } from 'modules/vendor/vendor.interface';

interface ICreateVendor {
  vendor?: Vendor;
  toggle: () => void;
}

export default function CreateVendor(props: ICreateVendor) {
  //! State
  const { vendor, toggle } = props;
  const theme = useTheme();
  const t = useTranslations();

  //! Function

  //! Render
  return (
    <CommonStyles.Box sx={{ display: 'flex', gap: 2 }}>
      <Content vendor={vendor} toggle={toggle} />
    </CommonStyles.Box>
  );
}
