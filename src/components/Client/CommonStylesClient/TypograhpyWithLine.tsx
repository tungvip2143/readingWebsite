import React from 'react';
import CommonStylesClient from '.';
import { useTheme } from '@mui/material';

interface TypographyWithLineProps {
  label: string;
}

const TypographyWithLine = (props: TypographyWithLineProps) => {
  const { label = 'Typograhpy With Line' } = props;
  //! State
  const theme = useTheme();

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'row', gap: '13px'}}>
      <CommonStylesClient.Box
        sx={{ width: 32, height: 2, background: theme.colors?.client?.coBaltBlue }}
      />
      <CommonStylesClient.Typography
        type='title16'
        sx={{ color: theme.colors?.client?.coBaltBlue }}
      >
        {label}
      </CommonStylesClient.Typography>
    </CommonStylesClient.Box>
  );
};

export default React.memo(TypographyWithLine);
