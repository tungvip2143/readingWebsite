import CommonStyles from 'components/CommonStyles';
import React from 'react';
import General from './Components/General';
import Actions from './Components/Actions';
import { HotDeal } from 'modules/hotDeal/hotDeal.interface';

interface WrapperGeneralProps {
  hotDeal?: HotDeal;
}
const WrapperGeneral = (props: WrapperGeneralProps) => {
  //! State
  const { hotDeal } = props;
  //! Function

  //! Render
  return (
    <CommonStyles.Box sx={{ display: 'flex', gap: 2, marginBottom: '1rem' }}>
      <General />
      <Actions hotDeal={hotDeal} />
    </CommonStyles.Box>
  );
};

export default React.memo(WrapperGeneral);
