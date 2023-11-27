import React from 'react';
import { FieldInputProps, FormikProps, getIn } from 'formik';
import CommonStyles from 'components/CommonStyles';
import { useTheme } from '@mui/material';

interface Props {
  field?: FieldInputProps<any>;
  form?: FormikProps<any>;
  sx?: React.CSSProperties;
  fullWidth?: boolean;
  disabled?: boolean;
  placeholder?: string;
}
const TextareaField = ({ field, form, sx, fullWidth, disabled, placeholder, ...props }: Props) => {
  const theme = useTheme();
  const { name, value, onBlur, onChange } = field || {};
  const { errors, touched } = form || {};
  const isTouched = getIn(touched, name!);
  const errorMessage = getIn(errors, name!);
  return (
    <CommonStyles.Box sx={{ width: 'inherit' }}>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        style={{
          fontFamily: 'inherit',
          width: fullWidth ? '100%' : 'inherit',
          height: '10rem',
          padding: '0.5rem',
          fontSize: '1rem',
          border:
            isTouched && errorMessage
              ? `1px solid ${theme.colors?.custom?.textRedErrors}`
              : '1px solid #ccc',
          borderRadius: '0.5rem',
          resize: 'vertical',
          ...sx,
        }}
        disabled={disabled}
        placeholder={placeholder}
        {...props}
      />
      {isTouched && errorMessage && (
        <CommonStyles.Box
          sx={{
            fontWeight: 400,
            fontSize: '0.75rem',
            lineHeight: 1.66,
            textAlign: 'left',
            margin: '0.25rem 0.875rem 0 0.875rem',
            color: theme.colors?.custom?.textRedErrors,
          }}
        >
          {errorMessage}
        </CommonStyles.Box>
      )}
    </CommonStyles.Box>
  );
};

export default TextareaField;
