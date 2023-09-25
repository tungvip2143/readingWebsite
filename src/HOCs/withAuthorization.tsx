'use client';

import CommonStyles from 'components/CommonStyles';
import { Roles } from 'constants/common';
import useAuth from 'hooks/useAuth';
import React, { Fragment } from 'react';

export const ComponentWrapper = ({
  children,
  roles,
}: {
  children: React.ReactNode;
  roles: Roles[];
}) => {
  const auth = useAuth();
  const roleFromSession = auth.user?.userType;

  if (roleFromSession && roles.includes(roleFromSession)) {
    return <Fragment>{children}</Fragment>;
  }

  return <CommonStyles.Box>You are not allowed to access this page</CommonStyles.Box>;
};

const withAuthorization = (Component: (props: any) => React.JSX.Element, roles: Roles[]) => {
  return (props: any) => {
    return (
      <ComponentWrapper roles={roles}>
        <Component {...props} />
      </ComponentWrapper>
    );
  };
};

export default withAuthorization;
