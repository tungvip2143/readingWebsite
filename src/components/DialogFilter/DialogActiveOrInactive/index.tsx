import CommonStyles from 'components/CommonStyles';
import React from 'react';
import { useTranslations } from 'next-intl';
import { Formik, FastField, Form, FormikHelpers } from 'formik';
import CustomFields from 'components/CustomFields';
import useConstants from 'hooks/useConstants';

interface FilterStatusFormValues {
  isActive?: number;
}
interface DialogFilterProps {
  isOpen: boolean;
  toggle: () => void;
  initialValues: FilterStatusFormValues;
  onSubmit: (
    values: FilterStatusFormValues,
    helpersFormik: FormikHelpers<FilterStatusFormValues>
  ) => void;
}

const DialogActiveOrInactive = (props: DialogFilterProps) => {
  //! State
  const { isOpen, toggle, onSubmit, initialValues } = props;
  const t = useTranslations();

  const { optionsActiveOrDeActive } = useConstants();

  //! Function

  //! Render
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(props) => {
        return (
          <CommonStyles.Dialog
            open={isOpen}
            toggle={toggle}
            title={t('Tour.addService')}
            content={
              <CommonStyles.Box sx={{ pt: 2 }}>
                <Form>
                  <CommonStyles.Box sx={{ width: '100%' }}>
                    <FastField
                      name='isActive'
                      label={t('Common.filter', { key: t('Articles.status') })}
                      component={CustomFields.SelectField}
                      options={optionsActiveOrDeActive}
                      fullWidth
                    />
                  </CommonStyles.Box>

                  <CommonStyles.Box sx={{ marginTop: '2rem' }}>
                    <CommonStyles.Button
                      type='submit'
                      variant='contained'
                      sx={{ marginRight: '1rem' }}
                    >
                      {t('Common.ok')}
                    </CommonStyles.Button>
                    <CommonStyles.Button variant='outlined' onClick={() => toggle()}>
                      {t('Common.cancel')}
                    </CommonStyles.Button>
                  </CommonStyles.Box>
                  <CommonStyles.FormikDebug />
                </Form>
              </CommonStyles.Box>
            }
            disableClickOutside={false}
            maxWidth='xs'
          />
        );
      }}
    </Formik>
  );
};

export default DialogActiveOrInactive;
