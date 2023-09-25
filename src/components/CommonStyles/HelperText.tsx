import React from 'react';
import CommonStyles from 'components/CommonStyles';
import { useTheme } from '@mui/material';
import { FormikErrors } from 'formik';

interface HelperTextProps {
  children:
    | string
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[]
    | undefined
    | React.ReactNode;
}

const HelperText = (props: HelperTextProps) => {
  //! State
  const { children } = props;
  const theme = useTheme();

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      sx={{
        fontWeight: 400,
        fontSize: '0.75rem',
        lineHeight: 1.66,
        textAlign: 'left',
        margin: '0.25rem 0.875rem 0 0.875rem',
        color: theme.colors?.custom?.textRedErrors,
      }}
    >
      {children as React.ReactNode}
    </CommonStyles.Box>
  );
};

export default React.memo(HelperText);
