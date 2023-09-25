import React from 'react';
import { useTheme } from '@mui/material';
import { Form, Formik } from 'formik';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import queryString from 'query-string';
import moment from 'moment';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import CommonIcons from 'components/Client/CommonIcons';
import LocationSelect from './LocationSelect';
import ChooseDateSelect from './ChooseDateSelect';
import pageUrls from 'constants/pageUrls';
import CommonStyles from 'components/CommonStyles';

const Divider = () => {
  const theme = useTheme();

  return (
    <CommonStylesClient.Box
      sx={{ width: '1px', height: 48, background: theme.colors?.client?.midGray }}
    />
  );
};

export interface FormSearchTourValues {
  location: string;
  chooseDate: Date | null;
}

const SearchTour = () => {
  const theme = useTheme();
  const t = useTranslations('FindTour');
  const route = useRouter();

  const initialValues: FormSearchTourValues = {
    location: '',
    chooseDate: null,
  };

  const onSubmit = (values: FormSearchTourValues) => {
    const bodyParsed = {
      location: values?.location,
      chooseDate: moment(values.chooseDate).format('DD/MM/YYYY'),
    };
    route.push(`${pageUrls.Tour}?${queryString.stringify(bodyParsed)}`);
  };

  return (
    <CommonStylesClient.Box>
      <Formik
        initialValues={initialValues}
        validateOnBlur
        validateOnChange
        onSubmit={onSubmit}
        // enableReinitialize
      >
        <Form>
          <CommonStylesClient.Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1rem',
              padding: '1rem',
              alignItems: 'center',
              background: theme.colors?.client?.white,
              boxShadow: `0rem 1.5rem 2.5rem 0rem #2D29290D`,
            }}
          >
            <CommonStylesClient.Box sx={{ width: 300 }}>
              <LocationSelect />
            </CommonStylesClient.Box>

            <CommonStylesClient.Box>
              <Divider />
            </CommonStylesClient.Box>
            <CommonStylesClient.Box sx={{ width: 300 }}>
              <ChooseDateSelect />
            </CommonStylesClient.Box>

            <CommonStylesClient.Box>
              <Divider />
            </CommonStylesClient.Box>

            <CommonStylesClient.Box sx={{ width: 155 }}>
              <CommonStylesClient.Button
                sx={{
                  textTransform: 'capitalize',
                  background: theme.colors?.client?.coBaltBlue,
                  borderRadius: '1rem',
                  padding: '1rem 2rem',
                }}
                type='submit'
                startIcon={<CommonIcons.IconSearch />}
              >
                {t('search')}
              </CommonStylesClient.Button>
            </CommonStylesClient.Box>
          </CommonStylesClient.Box>
          <CommonStyles.FormikDebug />
        </Form>
      </Formik>
    </CommonStylesClient.Box>
  );
};

export default SearchTour;
