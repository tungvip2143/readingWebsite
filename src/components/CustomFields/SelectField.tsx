import React, { ReactNode } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { FieldInputProps, FormikProps, getIn } from 'formik';
import Select, { SelectProps, SelectChangeEvent } from '@mui/material/Select';
import { find, get, isArray } from 'lodash';
import { SelectOption } from 'interfaces/common';
import CommonStyles from 'components/CommonStyles';
import { SxProps, useTheme } from '@mui/material';
interface Other {
  text?: ReactNode;
}

interface SelectFieldProps extends SelectProps, Other {
  field?: FieldInputProps<any>;
  form?: FormikProps<any>;
  options: SelectOption[];
  sxContainer?: SxProps;
  sxSelect?: SxProps;
  label?: string;
  placeholder?: string;
  loading?: boolean;
  onChangeCustomize?: (value: any) => void;
  afterOnChange?: (value: any) => void;
  isMultiple?: boolean;
}

const SelectField = ({
  field,
  form,
  options,
  label,
  sxContainer,
  placeholder,
  sxSelect,
  text,
  onChangeCustomize,
  loading,
  disabled,
  isMultiple = false,
  afterOnChange,
  ...props
}: SelectFieldProps) => {
  //! State
  const { name, value, onBlur, onChange } = field || {};
  const { errors, touched, setFieldValue, setFieldTouched } = form || {};

  const theme = useTheme();
  const valueMultiple: string[] = value || [];

  const isTouched = getIn(touched, name!);
  const errorMessage = getIn(errors, name!);

  //! Function
  const handleChangeMultiple = (event: SelectChangeEvent<unknown>) => {
    const {
      target: { value },
    } = event;
    if (setFieldValue && name) {
      setFieldValue(name, typeof value === 'string' ? value.split(',') : value);
    }
    afterOnChange && afterOnChange(event);
    setFieldTouched && setFieldTouched(name || '', true);
  };

  //! Render
  if (isMultiple) {
    return (
      <CommonStyles.Box sx={{ minWidth: 120, ...sxContainer }}>
        <FormControl
          fullWidth={props.fullWidth}
          error={isTouched && Boolean(errorMessage)}
          size={props.size}
        >
          <InputLabel id={`${name}`}>{label}</InputLabel>
          {/* Only for Customize */}
          {text}
          <Select
            multiple
            id={`${name}`}
            label={label}
            labelId={`${name}`}
            value={valueMultiple}
            name={name}
            onChange={handleChangeMultiple}
            onBlur={onBlur}
            sx={{ borderRadius: '0.5rem', ...sxSelect }}
            displayEmpty={!!placeholder}
            endAdornment={
              loading ? (
                <CommonStyles.Box
                  sx={{
                    paddingRight: '1.25rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <CommonStyles.Loading size={20} />
                </CommonStyles.Box>
              ) : undefined
            }
            renderValue={(selected) => {
              if (isArray(selected)) {
                const labelByValue = selected
                  ?.map((el) => options?.find((item) => item?.value === el))
                  ?.map((labelItem) => labelItem?.label);
                if (selected.length === 0) {
                  return (
                    <CommonStyles.Typography
                      variant='subtitle1'
                      sx={{ color: theme.colors?.bgneutral400, fontSize: '0.875rem' }}
                    >
                      {placeholder}
                    </CommonStyles.Typography>
                  );
                }

                return labelByValue.join(', ');
              }
            }}
            disabled={loading || disabled}
            {...props}
          >
            {placeholder && (
              <MenuItem disabled value=''>
                <em> {placeholder}</em>
              </MenuItem>
            )}
            {options?.map((el) => {
              return (
                <MenuItem key={el.value} value={el.value}>
                  {el.label}
                </MenuItem>
              );
            })}
          </Select>
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
        </FormControl>
      </CommonStyles.Box>
    );
  }
  return (
    <CommonStyles.Box className='select-field' sx={{ minWidth: 120, ...sxContainer }}>
      <FormControl
        fullWidth={props.fullWidth}
        error={isTouched && Boolean(errorMessage)}
        size={props.size}
      >
        {/* Only for Customize */}
        {text}
        <InputLabel id={`${name}`}>{label}</InputLabel>

        <Select
          id={`${name}`}
          label={label}
          labelId={`${name}`}
          value={value}
          name={name}
          onChange={(e) => {
            if (onChangeCustomize) {
              onChangeCustomize(e.target.value);
              return;
            }

            onChange && onChange(e);
            afterOnChange && afterOnChange(e);
            setFieldTouched && setFieldTouched(name || '', true);
          }}
          onBlur={onBlur}
          sx={{ borderRadius: '0.5rem', ...sxSelect }}
          displayEmpty={!!placeholder}
          endAdornment={
            loading ? (
              <CommonStyles.Box
                sx={{
                  paddingRight: '1.25rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CommonStyles.Loading size={20} />
              </CommonStyles.Box>
            ) : undefined
          }
          renderValue={(selected) => {
            const selectedOption = find(options, { value: selected });
            if (!selected && selected !== 0 && placeholder) {
              return (
                <CommonStyles.Typography
                  variant='subtitle1'
                  sx={{ color: theme.colors?.bgneutral400, fontSize: '0.875rem' }}
                >
                  {placeholder}
                </CommonStyles.Typography>
              );
            }

            return selectedOption?.label;
          }}
          disabled={loading || disabled}
          {...props}
        >
          {placeholder && (
            <MenuItem disabled value=''>
              <em> {placeholder}</em>
            </MenuItem>
          )}
          {options?.map((el) => {
            return (
              <MenuItem key={el.value} value={el.value}>
                {el.label}
              </MenuItem>
            );
          })}
        </Select>
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
      </FormControl>
    </CommonStyles.Box>
  );
};

export default SelectField;
