import React, { Fragment } from 'react';
import CommonIcons from 'components/CommonIconsMui';
import CommonStyles from 'components/CommonStyles';
import { Form, Formik, FormikConfig, FormikProps, FormikValues } from 'formik';
import { SxProps, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import { CommonButtonProps } from './CommonStyles/Button';

interface SearchAndFiltersProps<T> {
  renderFilterFields?: (propsFormik: FormikProps<T>) => React.ReactNode;
  onReset?: () => void;
  sxContainer?: SxProps;
  styleWrapperForm?: React.CSSProperties;
  hideDefaultSubmit?: boolean;
  sxBtnSearch?: SxProps;
  sxDefaultSubmit?: SxProps;
  hideResetButton?: boolean;
  isChild?: boolean;
}

function SearchAndFilters<T extends FormikValues = FormikValues>({
  initialValues,
  renderFilterFields,
  onSubmit,
  onReset,
  sxContainer,
  styleWrapperForm,
  hideDefaultSubmit,
  sxDefaultSubmit,
  sxBtnSearch,
  hideResetButton,
  isChild,
}: SearchAndFiltersProps<T> & FormikConfig<T>) {
  //! State
  const t = useTranslations();
  const theme = useTheme();

  //! Function
  const FormWrapper = isChild ? CommonStyles.Box : Form;

  //! Render
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(propsFormik) => {
        const { resetForm, errors } = propsFormik;

        return (
          <Form style={styleWrapperForm}>
            <CommonStyles.Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, ...sxContainer }}>
              {renderFilterFields && renderFilterFields(propsFormik)}

              {!hideDefaultSubmit && (
                <CommonStyles.Box sx={{ display: 'flex', gap: 2, ...sxDefaultSubmit }}>
                  <CommonStyles.Button
                    type='submit'
                    startIcon={<CommonIcons.Search />}
                    sx={{ background: theme.colors?.primary500, ...sxBtnSearch }}
                  >
                    {t('Common.search')}
                  </CommonStyles.Button>

                  {!hideResetButton && (
                    <CommonStyles.Button
                      type='button'
                      variant='text'
                      onClick={() => {
                        resetForm();
                        onReset && onReset();
                      }}
                      startIcon={<CommonIcons.Reset />}
                    >
                      {t('Common.reset')}
                    </CommonStyles.Button>
                  )}
                </CommonStyles.Box>
              )}
            </CommonStyles.Box>
            {/* <CommonStyles.FormikDebug /> */}
          </Form>
        );
      }}
    </Formik>
  );
}

export default SearchAndFilters;
