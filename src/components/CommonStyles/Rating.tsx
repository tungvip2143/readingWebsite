import React, { memo } from 'react';
import Rating from '@mui/material/Rating';
import { FieldInputProps, FormikProps } from 'formik';
import CommonStyles from 'components/CommonStyles';
import { SxProps } from '@mui/material';

interface Props {
  field?: FieldInputProps<any>;
  form?: FormikProps<any>;
  readOnly?: boolean;
  disabled?: boolean;
  haveFeedback?: boolean;
  valueTable?: number;
  sxRating?: SxProps;
}

const RatingMui = (props: Props) => {
  //! State
  const { field, form, readOnly, disabled, haveFeedback, valueTable, sxRating } = props;
  const { name, value, onChange } = field || {};
  const { errors, touched } = form || {};
  const [hover, setHover] = React.useState(-1);
  const valueRating = valueTable ? valueTable : value;
  //! Function
  const getLabelText = (value: number) => {
    return `${value} Star${value !== 1 ? 's' : ''}, ${value}`;
  };

  //! Render
  return (
    <CommonStyles.Box sx={{ display: 'flex' }}>
      <Rating
        name={name}
        value={valueRating}
        onChange={onChange}
        size='medium'
        readOnly={readOnly}
        disabled={disabled}
        getLabelText={getLabelText}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        sx={{ ...sxRating }}
      />

      {(!!value || hover !== -1) && haveFeedback && (
        <CommonStyles.Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
          {hover !== -1 ? Number(hover)?.toFixed(1) : Number(value)?.toFixed(1)}
        </CommonStyles.Box>
      )}
    </CommonStyles.Box>
  );
};
export default memo(RatingMui);
