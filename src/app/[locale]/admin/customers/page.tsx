'use client';
import React from 'react';

import CommonStyles from 'components/CommonStyles';
import ListCustomerTable from './ListCustomerTable';
import withAuthorization from 'HOCs/withAuthorization';
import { Roles } from 'constants/common';
import withPrivate from '../../../../HOCs/withPrivate';

const LisCustomerPage = () => {
  return (
    <CommonStyles.Box>
      <ListCustomerTable />
    </CommonStyles.Box>
  );
};

export default withPrivate(withAuthorization(LisCustomerPage, [Roles.ADMIN]));
