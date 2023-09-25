import CommonStyles from 'components/CommonStyles';
import React from 'react';
import General from './Components/General';
import Actions from './Components/Actions';
import { Tour } from 'modules/tour/tour.interface';
import { Collapse } from '@mui/material';

interface WrapperGeneralProps {
  tour?: Tour;
}

const WrapperGeneral = (props: WrapperGeneralProps) => {
  //! State
  const { tour } = props;

  //! Function

  //! Render
  return (
    <CommonStyles.Box sx={{ display: 'flex', gap: 2, marginBottom: '1rem' }}>
      <General />
      <Actions tour={tour} />
    </CommonStyles.Box>
  );
};

export default React.memo(WrapperGeneral);
