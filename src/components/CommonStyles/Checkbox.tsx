import React, { memo } from 'react';
import { Checkbox as CheckboxMui, CheckboxProps } from '@mui/material';

const CheckBox = (props: CheckboxProps) => {
  return <CheckboxMui {...props} />;
};

export default memo(CheckBox);
