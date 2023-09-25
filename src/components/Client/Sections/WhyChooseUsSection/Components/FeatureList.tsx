import React from 'react';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { useTheme } from '@mui/material';

interface FeatureListProps {
  nameFeature: string;
  introduceFeature: string;
  iconFeature: any;
  iconEllipse: any;
}

const FeatureList = (props: FeatureListProps) => {
  //! State
  const { nameFeature, introduceFeature, iconFeature, iconEllipse } = props;
  const theme = useTheme();

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        marginLeft: '20px',
      }}
    >
      <CommonStylesClient.Box>
        <CommonStylesClient.Box
          sx={{ position: 'relative', right: '15px', top: '71px', zIndex: 1 }}
        >
          {iconEllipse}
        </CommonStylesClient.Box>

        <CommonStylesClient.Box sx={{ position: 'relative', zIndex: 2 }}>
          {iconFeature}
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>

      <CommonStylesClient.Box sx={{ zIndex: '3' }}>
        <CommonStylesClient.Typography sx={{ marginBottom: '0.5rem' }} type='mobiHeading1'>
          {nameFeature}
        </CommonStylesClient.Typography>
        <CommonStylesClient.Typography type='text16' sx={{ color: theme.colors?.client.darkGray }}>
          {introduceFeature}
        </CommonStylesClient.Typography>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(FeatureList);
