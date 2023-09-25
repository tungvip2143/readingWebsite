import React, { useEffect, useState, useCallback } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import { Method } from 'constants/common';
import { useSave } from 'stores/useStore';
import cachedKeys from 'constants/cachedKeys';
import CommonStylesClient from '.';

const IconEndInput = () => {
  //! State
  const save = useSave();
  const [methodLoginSignup, setMethodLoginSignup] = useState(Method.PHONE);

  //! Function
  const renderIcon = () => {
    switch (methodLoginSignup) {
      case Method.EMAIL:
        return <EmailIcon />;
      case Method.PHONE:
        return <CallIcon />;
      default:
        break;
    }
  };

  const onToggleMethod = useCallback(() => {
    if (methodLoginSignup === Method.EMAIL) {
      setMethodLoginSignup(Method.PHONE);
      return;
    }
    if (methodLoginSignup === Method.PHONE) {
      setMethodLoginSignup(Method.EMAIL);
      return;
    }
  }, [methodLoginSignup]);

  //! Effect
  useEffect(() => {
    save(cachedKeys.methodLoginSignup, methodLoginSignup);
  }, [save, methodLoginSignup]);

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{ width: 'auto', margin: 0, cursor: 'pointer' }}
      onClick={onToggleMethod}
    >
      {renderIcon()}
    </CommonStylesClient.Box>
  );
};

export default React.memo(IconEndInput);
