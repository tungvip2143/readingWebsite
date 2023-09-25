import React from 'react';
import { useTranslations } from 'next-intl';
import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import CommonStyles from 'components/CommonStyles';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { useTheme } from '@mui/material';
import Filters from '../../Filters';
import { FormFilterTourBooking } from 'app/[locale]/local-friend/booking-tour/page';

export interface DialogFiltersTourBookingFormValues extends FormFilterTourBooking {}

interface DialogFiltersTourBookingProps {
  isOpen: boolean;
  toggle: () => void;
  filters: DialogFiltersTourBookingFormValues;
  onSubmit: (
    values: DialogFiltersTourBookingFormValues & FormikValues,
    helpers: FormikHelpers<DialogFiltersTourBookingFormValues & FormikValues>,
    toggle: () => void
  ) => void;
}

const DialogFiltersTourBooking = (props: DialogFiltersTourBookingProps) => {
  //! State
  const theme = useTheme();
  const { isOpen, toggle, onSubmit, filters } = props;
  const t = useTranslations();

  //! Function

  //! Effect

  //! Render
  return (
    <Formik
      initialValues={filters}
      onSubmit={(values, helpersFormik) => onSubmit(values, helpersFormik, toggle)}
      enableReinitialize
    >
      {({ isSubmitting }) => {
        return (
          <CommonStyles.Dialog
            content={
              <Form>
                <CommonStylesClient.Box>
                  <Filters sxContainer={{ width: '100%' }} />
                  <CommonStylesClient.Box
                    sx={{ display: 'flex', marginTop: '2rem', justifyContent: 'flex-end', gap: 2 }}
                  >
                    <CommonStylesClient.Button
                      type='submit'
                      variant='contained'
                      sx={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: '0.75rem',
                        border: `0.0625rem solid ${theme.colors?.client.coBaltBlue}`,
                        backgroundColor: theme.colors?.white,
                        color: theme.colors?.client.coBaltBlue,
                        textTransform: 'none',
                        boxShadow: 'none',
                        letterSpacing: '0.04rem',
                        '&.MuiLoadingButton-root:hover': {
                          backgroundColor: theme.colors?.white,
                          boxShadow: 'none',
                        },
                      }}
                    >
                      {t('Common.seeResults')}
                    </CommonStylesClient.Button>
                    <CommonStylesClient.Button
                      onClick={toggle}
                      variant='contained'
                      sx={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: '0.75rem',
                        border: `0.0625rem solid ${theme.colors?.client.red}`,
                        backgroundColor: theme.colors?.white,
                        color: theme.colors?.client.red,
                        textTransform: 'none',
                        boxShadow: 'none',
                        letterSpacing: '0.04rem',
                        '&.MuiLoadingButton-root:hover': {
                          backgroundColor: theme.colors?.white,
                          boxShadow: 'none',
                        },
                      }}
                    >
                      {t('Common.cancel')}
                    </CommonStylesClient.Button>
                  </CommonStylesClient.Box>
                </CommonStylesClient.Box>
              </Form>
            }
            open={isOpen}
            toggle={toggle}
            disableClickOutside={false}
          />
        );
      }}
    </Formik>
  );
};

export default React.memo(DialogFiltersTourBooking);
