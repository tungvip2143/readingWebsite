import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { FieldInputProps, FormikProps, getIn } from 'formik';
import { SelectOption, SetBooleanState, SetOptionsValue } from 'interfaces/common';
import Timer from 'helpers/timer';
import { SxProps, useTheme } from '@mui/material';
import CommonStyles from 'components/CommonStyles';

interface Props {
  field: FieldInputProps<any>;
  form: FormikProps<any>;
  label?: string;
  key: string;
  loadOptions: (text: string, setOptions: SetOptionsValue, setLoading: SetBooleanState) => void;
  multiple?: boolean;
  disableCloseOnSelect?: boolean;
  sx?: SxProps;
  sizeCustom: any;
  isSync?: boolean;
  options?: SelectOption[];
  loading?: boolean;
}

function AutoCompleteField(props: Props) {
  //! State
  const timer = React.useRef(new Timer());
  const theme = useTheme();
  const {
    field,
    form,
    loadOptions,
    label,
    key = 'value',
    multiple,
    disableCloseOnSelect,
    sx,
    sizeCustom = 'medium',
    isSync = false,
  } = props;

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<SelectOption[]>([]);
  const [loading, setLoading] = React.useState(false);

  const [text, setText] = React.useState<string>('');
  const { name, value, onBlur } = field || {};
  const { errors, touched } = form || {};

  const isTouched = getIn(touched, name!);
  const errorMessage = getIn(errors, name!);

  //! Function
  React.useEffect(() => {
    if (isSync) {
      setLoading(props?.loading || false);
      setOptions(props?.options || []);
    }
  }, [isSync, props.loading, props.options]);

  React.useEffect(() => {
    let active = true;
    if (!isSync) {
      (async () => {
        if (active) {
          timer.current.debounce(() => {
            loadOptions(text, setOptions, setLoading);
          }, 500);
        }
      })();
    }

    return () => {
      active = false;
    };
  }, [isSync, setOptions, text, setLoading]);

  // React.useEffect(() => {
  //   if (!open) {
  //     setOptions([]);
  //   }
  // }, [open]);

  const handleChange = (event: any, value: string | null) => {
    form?.setFieldValue(name, value);
  };

  //! Render
  return (
    <CommonStyles.Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Autocomplete
        id={name}
        multiple={multiple || false}
        sx={{
          width: 300,
          ...sx,
          '& fieldset': {
            borderColor:
              isTouched && errorMessage
                ? theme.colors?.custom?.textRedErrors
                : 'rgba(0, 0, 0, 0.23)',
          },
        }}
        open={open}
        filterSelectedOptions
        disableCloseOnSelect={disableCloseOnSelect || false}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        value={value}
        onChange={handleChange}
        onInputChange={(event, newInputValue) => {
          setText(newInputValue);
        }}
        onBlur={onBlur}
        inputValue={text}
        isOptionEqualToValue={(option, value) => {
          return option[key] === value[key];
        }}
        getOptionLabel={(option) => option.label}
        options={options}
        loading={loading}
        size={sizeCustom || 'medium'}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label || 'Asynchronous'}
            name={name}
            onBlur={onBlur}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color='inherit' size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
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
}

export default AutoCompleteField;
