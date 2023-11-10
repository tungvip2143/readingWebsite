'use client';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import CommonStyles from 'components/CommonStyles';
import Footer from 'components/Client/Sections/Footer';
import DefaultLayoutHome from 'components/DefaultLayoutHome';
import HomePage from 'components/Client/Sections/HomePage';
import { WIDTH_SIDEBAR } from 'constants/common';
import DefaultLayoutCient from 'components/DefaultLayoutCient';

type Props = {};

export default function Index(props: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {/* <DefaultLayoutCient> */}
      <DefaultLayoutHome>
        <CommonStyles.Box
          sx={{
            position: 'absolute',
            top: 0,
            left: WIDTH_SIDEBAR,
          }}
        >
          <HomePage />
        </CommonStyles.Box>
      </DefaultLayoutHome>
      {/* </DefaultLayoutCient> */}
    </LocalizationProvider>
  );
}
