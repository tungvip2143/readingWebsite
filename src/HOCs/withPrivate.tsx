'use client';
import { useRouter } from 'next/navigation';
import useAuth from 'hooks/useAuth';
import React, { Fragment, useEffect } from 'react';
import pageUrls from 'constants/pageUrls';
import { Roles } from 'constants/common';

export const ComponentWrapper = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const isLogged = auth.isLogged;
  const role = auth?.user?.role;
  const router = useRouter();

  useEffect(() => {
    if (!isLogged) {
      router.push(pageUrls.Homepage);
      return;
    }
  }, [isLogged, router, role]);

  if (isLogged) {
    return <Fragment>{children}</Fragment>;
  }
  return null;
};

const withPrivate = (
  Component: ({ children }: { children?: React.ReactNode }) => React.JSX.Element
) => {
  return class extends React.Component {
    constructor(props: any) {
      super(props);
    }

    render() {
      return (
        <ComponentWrapper>
          <Component {...this.props} />
        </ComponentWrapper>
      );
    }
  };
};

export default withPrivate;
