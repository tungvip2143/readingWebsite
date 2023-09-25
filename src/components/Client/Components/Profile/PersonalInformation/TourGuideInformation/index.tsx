import { useTheme } from '@mui/material';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import CustomFields from 'components/CustomFields';
import { useTranslations } from 'next-intl';
import React from 'react';
import { FastField } from 'formik';
import useConstants from 'hooks/useConstants';
import SelectPrefixPhone from 'components/SelectPrefixPhone';
import SelectProvince from 'components/SelectProvince';
import LeftContent from './LeftContent';
import RightContent from './RightContent';

interface TourGuideInformationProps {}

const TourGuideInformation = (props: TourGuideInformationProps) => {
  //! State

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box sx={{ display: 'flex', gap: 6, marginBottom: '2rem' }}>
      <LeftContent />
      <RightContent />
    </CommonStylesClient.Box>
  );
};

export default React.memo(TourGuideInformation);
