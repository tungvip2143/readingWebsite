'use client';

import React, { useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import DefaultLayoutUser from 'components/DefaultLayoutUser';
import useAuth from 'hooks/useAuth';
import { Roles } from 'constants/common';
import { useRouter } from 'next/navigation';
import pageUrls from 'constants/pageUrls';

function LayoutWaitingAcceptBook({ children }: { children: React.ReactNode }) {
  //! State
  const auth = useAuth();
  const router = useRouter();
  const isLogged = auth?.isLogged;
  const role = auth?.user?.userType;
  //! Function

  //! Effect
  useEffect(() => {
    if (!isLogged) {
      router.push(`${pageUrls.Homepage}`);
    }
  }, [isLogged, role]);

  //! Render
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DefaultLayoutUser>{children}</DefaultLayoutUser>
    </LocalizationProvider>
  );
}

export default LayoutWaitingAcceptBook;
