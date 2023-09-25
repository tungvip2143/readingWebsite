import React from 'react';
import { FastField } from 'formik';

import { useTheme } from '@mui/material';
import CommonIcons from 'components/Client/CommonIcons';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import CustomFields from 'components/CustomFields';

interface SearchInputProps {
  afterOnChange?: (value: string) => void;
}

const SearchInput = ({ afterOnChange }: SearchInputProps) => {
  //! State
  const theme = useTheme();

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        ['.MuiTextField-root']: {
          width: '100%',
        },
      }}
    >
      <FastField
        component={CustomFields.TextField}
        name='textSearch'
        placeholder={'Search tour'}
        iconStartInput={<CommonIcons.IconSearchGray />}
        sx={{
          '& div': {
            height: 48,
            borderRadius: '1rem',
          },
          ['.MuiInputBase-input']: {},
          input: {
            fontWeight: 400,
            lineHeight: '1.4rem',
            letterSpacing: '0.0175rem',
            color: theme.colors?.client.grayNeutral203,
            padding: '11px 14px',
            paddingLeft: 0,
          },
        }}
        afterOnChange={afterOnChange}
      />
    </CommonStylesClient.Box>
  );
};

export default React.memo(SearchInput);
