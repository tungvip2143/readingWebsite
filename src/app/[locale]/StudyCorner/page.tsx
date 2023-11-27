'use client';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import CommonStyles from 'components/CommonStyles';
import DefaultLayoutHome from 'components/DefaultLayoutHome';
import HomePage from 'components/Client/Sections/HomePage';
import { Topic, WIDTH_SIDEBAR } from 'constants/common';
import { parseQueryString } from 'helpers/common';
import { usePathname } from 'next/navigation';
import Events from '../Events/page';

type Props = {};

export default function THREE_F(props: Props) {
  return <Events />;
}
