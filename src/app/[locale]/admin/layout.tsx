'use client';

import React from 'react';
import CommonStyles from 'components/CommonStyles';
import DefaultLayoutAdmin from 'components/DefaultLayoutAdmin';
import withPrivate from 'HOCs/withPrivate';

function LayoutAdmin({ children }: { children?: React.ReactNode }) {
  //! State

  //! Function

  //! Effect

  //! Render
  return (
    <DefaultLayoutAdmin>
      <CommonStyles.Box
        sx={{
          padding: { xl: '2.5em 8.25em', lg: '2em 8em', md: '1.25em 3.5em', xs: '1em 2em' },
          marginTop: '4.25em',
        }}
      >
        {children}
      </CommonStyles.Box>
    </DefaultLayoutAdmin>
  );
}

export default withPrivate(LayoutAdmin);
