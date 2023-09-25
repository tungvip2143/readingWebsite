import React from 'react';
import Filters from '../../Components/Filters';
import { Form, Formik, FormikHelpers } from 'formik';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { useTranslations } from 'next-intl';
import { useTheme } from '@mui/material';
import { useGet } from 'stores/useStore';
import cachedKeys from 'constants/cachedKeys';
import { FormFilterMyBooking } from '../MyBookingContainer';
import MyBookingFilterModel from 'models/myBookingFilter.model';

interface FiltersMyBookingProps {
  initialFilters: FormFilterMyBooking;
  toggle: () => void;
}

const FiltersMyBooking = (props: FiltersMyBookingProps) => {
  //! State
  const { initialFilters, toggle } = props;
  const t = useTranslations();
  const theme = useTheme();
  const setFiltersMyBooking = useGet(cachedKeys.setFiltersMyBooking);

  //! Function
  const onSubmit = (values: FormFilterMyBooking, actions: FormikHelpers<FormFilterMyBooking>) => {
    const nextFilters = MyBookingFilterModel.parseBodyToRequest(values);
    setFiltersMyBooking(nextFilters);
    toggle();
  };

  //! Render
  return (
    <Formik initialValues={initialFilters} onSubmit={onSubmit}>
      {(props) => {
        return (
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
        );
      }}
    </Formik>
  );
};

export default React.memo(FiltersMyBooking);
