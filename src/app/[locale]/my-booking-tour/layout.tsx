'use client';

import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import DefaultLayoutUser from 'components/DefaultLayoutUser';

function LayouPlaces({ children }: { children: React.ReactNode }) {
  //! State

  //! Function

  //! Effect

  //! Render
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DefaultLayoutUser>{children}</DefaultLayoutUser>
    </LocalizationProvider>
  );
}

export default LayouPlaces;
