'use client';

import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function AppLocalization(props: { children: React.ReactNode }) {
  //! State
  const { children } = props;

  //! Function

  //! Render
  return <LocalizationProvider dateAdapter={AdapterDateFns}>{children}</LocalizationProvider>;
}
