import React, { Dispatch, SetStateAction } from 'react';
import { useSearchParams } from 'next/navigation';
import { Form, Formik, FormikHelpers } from 'formik';

import CommonStylesClient from 'components/Client/CommonStylesClient';
import TourList from './Components/TourList';
import Search from 'components/Client/Components/Search';
import Filters from 'components/Client/Components/Filters';
import { ListOfCategory } from 'interfaces/common';
import Timer from 'helpers/timer';
import VendorModel from 'models/tourClientFilter.model';
import { InitialFiltersSearch } from 'hooks/useFiltersHandler';
import { RequestGetListToursByCategory } from 'modules/toursByCategory/toursByCategory.interface';
import TourClientModel from 'models/tourClientFilter.model';
import CommonStyles from 'components/CommonStyles';
interface TourContainerProps {
  listOfCategory?: ListOfCategory[];
  filters: InitialFiltersSearch<RequestGetListToursByCategory>;
  handleSearch: (values: InitialFiltersSearch<RequestGetListToursByCategory>) => void;
}

const timerInputSearch = new Timer();
const TourContainer = (props: TourContainerProps) => {
  //! State
  const { filters, handleSearch } = props;
  const hasCategory = !!filters?.categories;

  const initialValues = TourClientModel.parseInitialValues(filters);
  //! Function

  //! Render
  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur
      validateOnChange
      onSubmit={(values) => {
        const requestPayload = TourClientModel.parseBodyToRequest(values, hasCategory);
        handleSearch({ ...filters, ...requestPayload });
      }}
      // enableReinitialize
    >
      {(propsFormik) => (
        <Form>
          <CommonStylesClient.Box>
            <Search
              afterOnChangeInput={() => {
                timerInputSearch.debounce(() => {
                  propsFormik.handleSubmit();
                }, 1000);
              }}
            />
            <CommonStylesClient.Box
              sx={{ display: 'flex', flexDirection: 'row', padding: '2rem 0', gap: '2.5rem' }}
            >
              <CommonStylesClient.Box sx={{ width: 250 }}>
                <Filters
                  afterOnChange={() => {
                    timerInputSearch.debounce(() => {
                      propsFormik.handleSubmit();
                    }, 1000);
                  }}
                />
              </CommonStylesClient.Box>
              <CommonStylesClient.Box sx={{ flexGrow: 1 }}>
                <TourList />
              </CommonStylesClient.Box>
            </CommonStylesClient.Box>
          </CommonStylesClient.Box>
          <CommonStyles.FormikDebug />
        </Form>
      )}
    </Formik>
  );
};

export default React.memo(TourContainer);
