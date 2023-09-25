'use client';

import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import DefaultLayoutUser from 'components/DefaultLayoutUser';

function LayouPlaces({ children }: { children: React.ReactNode }) {
  //! State

  //! Function

  //! Effect

  //! Render
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DefaultLayoutUser>{children}</DefaultLayoutUser>
    </LocalizationProvider>
  );
}

export default LayouPlaces;
