import CommonStyles from 'components/CommonStyles';
import React from 'react';
import General from './Components/General';
import Actions from './Components/Actions';
import { Vendor } from 'modules/vendor/vendor.interface';

interface WrapperGeneralProps {
  vendor?: Vendor;
}

const WrapperGeneral = (props: WrapperGeneralProps) => {
  //! State
  const { vendor } = props;

  //! Function

  //! Render
  return (
    <CommonStyles.Box sx={{ display: 'flex', gap: 2, marginBottom: '1rem' }}>
      <General />
      <Actions vendor={vendor} />
    </CommonStyles.Box>
  );
};

export default React.memo(WrapperGeneral);
