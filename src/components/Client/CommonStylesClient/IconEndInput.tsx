import React, { useState } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import { Method } from 'constants/common';
import CommonStylesClient from '.';

interface IconEndInputProps {
  initialMethod?: Method;
  onClickIcon?: (nextMethod: Method) => void;
}

const IconEndInput = (props: IconEndInputProps) => {
  //! State
  const [method, setMethod] = useState(props?.initialMethod || Method.PHONE);

  //! Function
  const renderIcon = () => {
    switch (method) {
      case Method.PHONE:
        return <EmailIcon />;
      case Method.EMAIL:
        return <CallIcon />;
      default:
        break;
    }
  };

  const onClickMethod = () => {
    let nextMethod = method;

    if (method === Method.PHONE) {
      nextMethod = Method.EMAIL;
    }

    if (method === Method.EMAIL) {
      nextMethod = Method.PHONE;
    }

    setMethod(nextMethod);
    props?.onClickIcon && props.onClickIcon(nextMethod);
  };

  //! Effect

  //! Render
  return (
    <CommonStylesClient.Box
      sx={{ width: 'auto', margin: 0, cursor: 'pointer' }}
      onClick={onClickMethod}
    >
      {renderIcon()}
    </CommonStylesClient.Box>
  );
};

export default React.memo(IconEndInput);
