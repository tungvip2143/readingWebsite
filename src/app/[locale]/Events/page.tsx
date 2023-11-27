'use client';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import CommonStyles from 'components/CommonStyles';
import DefaultLayoutHome from 'components/DefaultLayoutHome';
import HomePage from 'components/Client/Sections/HomePage';
import { Topic, WIDTH_SIDEBAR } from 'constants/common';
import { usePathname } from 'next/navigation';

type Props = {};

export default function Events(props: Props) {
  const pathname = usePathname();
  const topic = pathname.split('en/')[1];
  const parseTopic = (topic: string) => {
    switch (topic) {
      case 'Events':
        return Topic.EVENTS;
      case 'Top+':
        return Topic.TOP_PLUS;
      case '3F':
        return Topic.THREE_F;
      case 'Charity':
        return Topic.CHARITY;
      case 'TheFaceDewey':
        return Topic.THE_FACE_DEWEY;
      case 'StudyCorner':
        return Topic.STUDY_CORNER;
      case 'Shock':
        return Topic.SHOCK;
      default:
        return Topic.EVENTS;
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {/* <DefaultLayoutCient> */}
      <DefaultLayoutHome>
        <CommonStyles.Box
          sx={{
            position: 'absolute',
            top: 0,
            left: WIDTH_SIDEBAR,
            width: '80%',
          }}
        >
          <HomePage topic={parseTopic(topic)} />
        </CommonStyles.Box>
      </DefaultLayoutHome>
      {/* </DefaultLayoutCient> */}
    </LocalizationProvider>
  );
}
