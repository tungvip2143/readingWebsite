import React, { ReactNode } from 'react';
import { SxProps } from '@mui/material';
import { FieldInputProps, FormikProps, getIn } from 'formik';
import { DesktopTimePicker } from '@mui/x-date-pickers';
import CommonStyles from 'components/CommonStyles';
import dayjs from 'dayjs';
interface TimePickerFieldI {
  type?: string;
  label?: string;
  disabled?: boolean;
  field: FieldInputProps<any>;
  form: FormikProps<any>;
  sxContainer?: SxProps;
  isMobileDatePicker?: boolean;
  text?: ReactNode;
  icon?: React.ElementType<any>;
  formatCustom?: string;
  isDayjs?: boolean;
  afterOnChange?: (date: any) => void;
}

const TimePickerField = (props: TimePickerFieldI) => {
  //! State
  const { field, form, label, disabled, sxContainer, text, isDayjs, afterOnChange } = props;
  const { errors, touched } = form || {};
  const { name, value, onBlur } = field || {};

  const isTouched = getIn(touched, name!);
  const errorMessage = getIn(errors, name!);

  //! Function
  const handleChange = (date: any) => {
    let result = date;

    if (isDayjs) {
      result = dayjs(result).toDate();
    }
    form.setFieldValue(name, result);

    afterOnChange && afterOnChange(result);
    form.setFieldTouched(name, true);
  };

  //! Render

  return (
    <CommonStyles.Box>
      {text}
      <DesktopTimePicker
        disabled={disabled}
        label={label}
        value={new Date(value)}
        slotProps={{
          textField: {
            onBlur,
            name,
            id: name,
            error: isTouched && Boolean(errorMessage),
            helperText: isTouched && errorMessage,
          },
        }}
        format='HH:mm'
        onChange={handleChange}
        sx={{
          '& div': {
            borderRadius: '8px',
            '& input': {
              padding: '8.5px 14px',
            },
          },
          ...sxContainer,
        }}
        {...props}
      />
    </CommonStyles.Box>
  );
};

export default TimePickerField;
