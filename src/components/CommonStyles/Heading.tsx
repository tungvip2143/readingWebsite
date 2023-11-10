import React, { ReactNode } from 'react';
import CommonIcons from 'components/CommonIconsMui';
import CommonStyles from 'components/CommonStyles';
import { useTheme } from '@mui/material';

interface HeadingProps {
  rightContent?: ReactNode;
  children: ReactNode;
  title: string;
}

const Heading = (props: HeadingProps) => {
  const { title, rightContent, children } = props;
  //! State

  const theme = useTheme();

  //! Function

  //! Render
  return (
    <CommonStyles.Box sx={{ mt: 2 }}>
      {/* <CommonStyles.BreadcrumbsMui
        style={{ mb: 3, fontSize: '14px', lineHeight: '22px', color: theme.colors?.bgneutral500 }}
      /> */}
      <CommonStyles.Box
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}
      >
        <CommonStyles.Typography
          sx={{
            mb: 3,
            fontSize: '32px',
            lineHeight: '48px',
            color: theme.colors?.bgneutral900,
            fontWeight: '700',
            margin: 0,
          }}
        >
          {title}
        </CommonStyles.Typography>
        {rightContent}
      </CommonStyles.Box>
      {children}
    </CommonStyles.Box>
  );
};

export default React.memo(Heading);
