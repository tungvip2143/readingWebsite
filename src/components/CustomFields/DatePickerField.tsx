import React, { ReactNode, useMemo } from 'react';
import { SxProps } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FieldInputProps, FormikProps, getIn } from 'formik';
import { MobileDatePicker } from '@mui/x-date-pickers';
import CommonStyles from 'components/CommonStyles';
import { DEFAULT_FORMAT_DATE } from 'constants/common';

import dayjs from 'dayjs';
import CommonIcons from 'components/CommonIcons';
import { isNull } from 'lodash';
interface DatePickerFieldI {
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

const DatePickerField = (props: DatePickerFieldI) => {
  //! State
  const {
    field,
    form,
    label,
    disabled,
    sxContainer,
    isMobileDatePicker = false,
    text,
    icon,
    formatCustom,
    isDayjs,
    afterOnChange,
  } = props;
  const { errors, touched } = form || {};
  const { name, value, onBlur } = field || {};

  const isTouched = getIn(touched, name!);
  const errorMessage = getIn(errors, name!);

  const valueDate = useMemo(() => {
    if (isDayjs) {
      return value ? dayjs(value) : null;
    }

    return value;
  }, [isDayjs, value]);

  //! Function
  const handleChange = (date: any) => {
    let result = date;

    if (isDayjs) {
      result = dayjs(result).toDate();
    }
    form.setFieldValue(name, result);

    afterOnChange && afterOnChange(result);
  };

  //! Render
  if (isMobileDatePicker) {
    return (
      <CommonStyles.Box>
        {text}
        <MobileDatePicker
          disabled={disabled}
          label={label}
          value={value}
          slotProps={{
            textField: {
              onBlur,
              name,
              id: name,
              error: isTouched && Boolean(errorMessage),
              helperText: isTouched && errorMessage,
            },
          }}
          format={DEFAULT_FORMAT_DATE}
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
  }

  return (
    <DatePicker
      disabled={disabled}
      label={label}
      value={valueDate}
      slotProps={{
        textField: {
          onBlur,
          name,
          id: name,
          error: isTouched && Boolean(errorMessage),
          helperText: isTouched && errorMessage,
        },
        actionBar: value
          ? {
              actions: ['clear'],
            }
          : undefined,
      }}
      slots={{
        openPickerIcon: icon ? icon : undefined,
      }}
      onAccept={(newDate) => {
        if (isNull(newDate)) {
          form.setFieldValue(name, undefined);
        }
      }}
      format={formatCustom ? formatCustom : DEFAULT_FORMAT_DATE}
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
  );
};

export default DatePickerField;
