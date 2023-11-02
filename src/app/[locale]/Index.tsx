'use client';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import DefaultLayoutUser from 'components/DefaultLayoutUser';
import CommonStyles from 'components/CommonStyles';
import FindTourSection from 'components/Client/Sections/FindTourSection';
import Marketing from 'components/Client/Sections/Marketing';
import PlacesToGoSession from 'components/Client/Sections/PlacesToGoSection';
import WhyChooseUseSession from 'components/Client/Sections/WhyChooseUsSection';
import ExploreOurTours from 'components/Client/Sections/ExploreOurTours';
import AllTheBestPlaces from 'components/Client/Sections/AllTheBestPlaces';
import Footer from 'components/Client/Sections/Footer';
import ExploreJourneySection from 'components/Client/Sections/ExploreJourneySection';

type Props = {};

export default function Index(props: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DefaultLayoutUser>
        <CommonStyles.Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'center',
          }}
        >
          <FindTourSection />
          <ExploreJourneySection />
          <ExploreOurTours />
          <PlacesToGoSession />
          <AllTheBestPlaces />
          <WhyChooseUseSession />
          <Marketing />
        </CommonStyles.Box>
        <Footer />
      </DefaultLayoutUser>
    </LocalizationProvider>
  );
}
