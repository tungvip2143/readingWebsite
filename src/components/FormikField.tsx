import { FastField, Field } from 'formik';
import * as React from 'react';

type Props<TComponentProps> = {
  name: string;
  component: React.ComponentType<TComponentProps>;
  isFastField?: boolean;
} & Omit<TComponentProps, 'name' | 'component' | 'field' | 'form'>;

class FormikField<T> extends React.PureComponent<Props<T>> {
  render() {
    const { name, component, isFastField, ...props } = this.props;
    const FieldComponent = isFastField ? FastField : Field;
    return <FieldComponent name={name} component={component} {...props} />;
  }
}

export default FormikField;
