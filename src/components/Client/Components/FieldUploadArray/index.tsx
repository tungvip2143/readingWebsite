import React from 'react';
import { ArrayHelpers, FieldArray } from 'formik';

interface Props {
  name: string;
  renderContent: (arrayHelpers: ArrayHelpers) => void;
  setFieldTouched?: (field: string, isTouched?: boolean, shouldValidate?: boolean) => void;
}
const FieldUploadArray = (props: Props) => {
  const { name, renderContent } = props;
  return <FieldArray name={name} render={renderContent} />;
};

export default FieldUploadArray;
