import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { useTheme } from '@mui/material';

interface Props {
  topic?: string;
}

const BreadcrumbArticle = ({ topic }: Props) => {
  //! State
  const theme = useTheme();
  const breadcrumbs = [
    <Link href='/' style={{ textDecoration: 'none' }}>
      <CommonStylesClient.Typography type='pcHeading5'>Home</CommonStylesClient.Typography>
    </Link>,
    <CommonStylesClient.Typography type='pcHeading5' sx={{ color: `${theme?.colors?.primary500}` }}>
      {topic}
    </CommonStylesClient.Typography>,
  ];

  //! Function

  //! Render
  return (
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize='small' />}
        aria-label='breadcrumb'
        sx={{ my: 3 }}
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
};

export default BreadcrumbArticle;
