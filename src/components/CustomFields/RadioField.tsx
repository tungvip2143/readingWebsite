import Radio from '@mui/material/Radio';
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { FieldInputProps, FormikProps, getIn } from 'formik';
import { SelectOption } from 'interfaces/common';
import { SxProps, Theme, useTheme } from '@mui/material';
import CommonStyles from 'components/CommonStyles';

interface RadioFieldI extends RadioGroupProps {
  field?: FieldInputProps<any>;
  form?: FormikProps<any>;
  values: SelectOption[];
  label?: string;
  sizeRadio: 'small' | 'medium';
  styleFormControl?: SxProps<Theme>;
  disabled?: boolean;
}

function RadioField(props: RadioFieldI) {
  const { field, form, values, label, sizeRadio, styleFormControl, disabled, ...restProps } = props;
  const theme = useTheme();
  const { name, value, onBlur, onChange } = field || {};
  const { errors, touched, setFieldValue } = form || {};
  const isTouched = getIn(touched, name!);
  const errorMessage = getIn(errors, name!);
  return (
    <FormControl sx={styleFormControl}>
      {label && <FormLabel id={name}>{label}</FormLabel>}
      <RadioGroup
        aria-labelledby={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        row
        {...restProps}
      >
        {values.map((el) => {
          return (
            <FormControlLabel
              key={el.value}
              value={el.value}
              control={<Radio size={sizeRadio} disabled={disabled} />}
              label={el.label}
            />
          );
        })}
      </RadioGroup>
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
  );
}

export default RadioField;
