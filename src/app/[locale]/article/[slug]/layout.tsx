'use client';

import React, { useEffect } from 'react';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { MAX_HEIGHT_NAVBAR, Roles } from 'constants/common';
import useAuth from 'hooks/useAuth';
import pageUrls from 'constants/pageUrls';
import { useRouter } from 'next/navigation';
import SidebarHome from 'components/Client/Sections/SidebarHome';
import useCheckResolution from 'hooks/useCheckResolution';
import Header from 'components/Client/Sections/Header';

function DefaultLayoutHome({ children }: { children: React.ReactNode }) {
  //! State
  const auth = useAuth();
  const router = useRouter();
  const isLogged = auth.isLogged;
  const role = auth?.user?.role;
  const { isTablet } = useCheckResolution();

  useEffect(() => {
    if (role === Roles.ADMIN) {
      router.push(pageUrls.Admin);
      return;
    }
  }, [isLogged, router, role]);

  //! Function

  //! Effect

  //! Render
  return (
    <CommonStylesClient.Box sx={{ position: 'relative' }}>
      <Header />
      <CommonStylesClient.Toolbar sx={{ height: MAX_HEIGHT_NAVBAR }} />
      {children}
    </CommonStylesClient.Box>
  );
}

export default DefaultLayoutHome;
