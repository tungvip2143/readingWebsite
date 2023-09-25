import React from 'react';
import { FormikConsumer } from 'formik';
import { isDevelopment } from 'helpers/common';

const FormikDebug = () => {
  const isProduction = !isDevelopment();
  if (isProduction) {
    return null;
  }

  return (
    <div
      style={{
        position: 'relative',
        margin: '2rem 0rem',
        borderRadius: 4,
        background: '#f6f8fa',
        boxShadow: '0 0 1px  #eee inset',
        maxWidth: 800,
      }}
    >
      <div
        style={{
          textTransform: 'uppercase',
          fontSize: 11,
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          fontWeight: 500,
          padding: '.5rem',
          background: '#555',
          color: '#fff',
          letterSpacing: '1px',
        }}
      >
        Formik State
      </div>
      <FormikConsumer>
        {({ validationSchema, validate, ...rest }) => (
          <pre
            style={{
              fontSize: '.85rem',
              padding: '.25rem .5rem',
              overflowX: 'scroll',
            }}
          >
            {JSON.stringify(rest, null, ' ')}
          </pre>
        )}
      </FormikConsumer>
    </div>
  );
};

export default FormikDebug;
