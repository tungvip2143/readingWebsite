import React from 'react';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import { MAX_WIDTH_CONTAINER } from 'constants/common';
import JourneyList from './Components/JourneyList';
import JourneyHeading from './Components/JourneyHeading';
import useCheckResolution from 'hooks/useCheckResolution';
import JourneyHeadingMobile from './MobileScreen/Components/JourneyHeadingMobile';
import useGetListTourCategory from 'modules/tour-category/hooks/useGetListTourCategory';

interface ExploreJourneySectionProps {}

const ExploreJourneySection = (props: ExploreJourneySectionProps) => {
  //! State
  const { isMobile } = useCheckResolution();
  //! Function
  const { data: resTourCategory, isLoading: isLoadingTourCategory } = useGetListTourCategory();
  //! Render
  if (isMobile) {
    return (
      <CommonStylesClient.Box
        sx={{
          padding: '0 1.5rem 2.5rem 1.5rem',
          width: '100%',
        }}
      >
        <JourneyHeadingMobile />
        <JourneyList data={resTourCategory} loading={isLoadingTourCategory} />
      </CommonStylesClient.Box>
    );
  }
  return (
    <CommonStylesClient.Box
      sx={{
        padding: {
          lg: '0',
          md: '0 2rem',
          xs: '0 1rem',
          width: '100%',
          maxWidth: MAX_WIDTH_CONTAINER,
          margin: '0 auto',
        },
      }}
    >
      <JourneyHeading />
      <JourneyList data={resTourCategory} />
    </CommonStylesClient.Box>
  );
};

export default React.memo(ExploreJourneySection);
