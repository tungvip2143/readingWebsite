import React from 'react';
import CommonStylesClient from 'components/Client/CommonStylesClient';

interface FeatureListMobileProps {
  nameFeature: string;
  introduceFeature: string;
  iconFeature: any;
  iconEllipse: any;
}

const FeatureListMobile = (props: FeatureListMobileProps) => {
  //! State
  const { nameFeature, introduceFeature, iconFeature, iconEllipse } = props;

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
        <CommonStylesClient.Typography sx={{ marginBottom: '0.5rem' }} type='mobiHeading2'>
          {nameFeature}
        </CommonStylesClient.Typography>
        <CommonStylesClient.Typography type='text14'>
          {introduceFeature}
        </CommonStylesClient.Typography>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default React.memo(FeatureListMobile);
