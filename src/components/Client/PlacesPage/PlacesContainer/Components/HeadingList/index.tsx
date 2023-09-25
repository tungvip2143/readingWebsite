import React from 'react';
import { useTheme } from '@mui/material';

import CommonStylesClient from 'components/Client/CommonStylesClient';

interface HeadingListProps {
  label: string;
  total: number;
}

const HeadingList = (props: HeadingListProps) => {
  //! State
  const { label, total = 0 } = props;
  const theme = useTheme();

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
    >
      <CommonStylesClient.Typography
        type='mobiHeading1'
        sx={{ color: theme?.colors?.client?.black }}
      >
        {`${label} (${total}${Number(total) === 0 ? '' : '+'})`}
      </CommonStylesClient.Typography>
    </CommonStylesClient.Box>
  );
};

export default React.memo(HeadingList);
