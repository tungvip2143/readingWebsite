'use client';

import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastifyProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Fragment>
      {children}
      <ToastContainer
        theme='light'
        style={{
          width: '21.875rem',
        }}
      />
    </Fragment>
  );
};

export default ToastifyProvider;
