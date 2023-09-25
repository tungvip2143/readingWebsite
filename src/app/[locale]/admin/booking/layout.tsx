'use client';

import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DefaultLayoutAdmin from 'components/DefaultLayoutAdmin';

function LayoutBooking({ children }: { children: React.ReactNode }) {
  //! State

  //! Function

  //! Effect

  //! Render
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DefaultLayoutAdmin>{children}</DefaultLayoutAdmin>
    </LocalizationProvider>
  );
}

export default LayoutBooking;
