'use client';

import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/vi';
import 'dayjs/locale/en';
import DefaultLayoutUser from 'components/DefaultLayoutUser';
import { useLocale } from 'next-intl';

function LayouPlaces({ children }: { children: React.ReactNode }) {
  //! State
  const locale = useLocale();
  //! Function

  //! Effect

  //! Render
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <DefaultLayoutUser>{children}</DefaultLayoutUser>
    </LocalizationProvider>
  );
}

export default LayouPlaces;
