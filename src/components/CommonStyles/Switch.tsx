import React, { memo } from 'react';
import Switch from '@mui/material/Switch';
import { FieldInputProps, FormikProps } from 'formik';

interface Props {
  field?: FieldInputProps<any>;
  form?: FormikProps<any>;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default';
}
const SwitchMui = (props: Props) => {
  //! State
  const { field, color } = props;
  const { name, value, onChange } = field || {};

  const handleOnchange = () => {
    onChange &&
      onChange({
        target: {
          name,
          value: !value,
        },
      });
  };

  return (
    <Switch
      name={name}
      checked={value}
      onChange={handleOnchange}
      inputProps={{ 'aria-label': 'controlled' }}
      color={color}
    />
  );
};

export default memo(SwitchMui);
