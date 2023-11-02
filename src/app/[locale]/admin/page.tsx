'use client';
import React from 'react';

import CommonStyles from 'components/CommonStyles';
import ArticlesTable from './articles/ArticlesTable';
import withAuthorization from 'HOCs/withAuthorization';
import { Roles } from 'constants/common';
import withPrivate from 'HOCs/withPrivate';

const AdminPage = () => {
  return (
    <CommonStyles.Box>
      <ArticlesTable />
    </CommonStyles.Box>
  );
};

export default withPrivate(withAuthorization(AdminPage, [Roles.ADMIN]));
