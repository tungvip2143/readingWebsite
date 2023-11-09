'use client';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import DefaultLayoutUser from 'components/DefaultLayoutUser';
import CommonStyles from 'components/CommonStyles';
import Footer from 'components/Client/Sections/Footer';

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
          aaaa
        </CommonStyles.Box>
        <Footer />
      </DefaultLayoutUser>
    </LocalizationProvider>
  );
}
