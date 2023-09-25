'use client';

import useBroadcastChannel from 'hooks/useBroadcastChannel';
import { Fragment } from 'react';

const BroadcastProvider = ({ children }: { children: React.ReactNode }) => {
  useBroadcastChannel();

  return (
    <Fragment>
      {children}
    </Fragment>
  );
};

export default BroadcastProvider;
