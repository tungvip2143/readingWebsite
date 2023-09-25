import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Form, Formik, FormikHelpers, useFormikContext } from 'formik';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import Search from 'components/Client/Components/Search';
import Filters from 'components/Client/Components/Filters';
import PlacesList from './Components/PlacesList';
import CommonStyles from 'components/CommonStyles';
import useGetVendorList from 'modules/vendor/hooks/useGetVendorList';
import useFiltersHandler, { InitialFiltersSearch } from 'hooks/useFiltersHandler';
import { Order } from 'interfaces/common';
import Timer from 'helpers/timer';

import { RequestGetListVendor } from 'modules/vendor/vendor.interface';
import VendorClientFilter from 'models/vendorClientFilter.model';
interface PlacesContainerProps {}
export interface FormPlaceFilterValues extends Omit<RequestGetListVendor, 'type'> {
  type?: string[];
}
const timerInputSearch = new Timer();
const initialFilters: RequestGetListVendor = {
  sortField: 'createdAt',
  sortOrder: Order.asc,
  textSearch: '',
  type: undefined,
  provinceCode: '',
  tourId: undefined,
  rating: undefined,
  maxPrice: undefined,
  minPrice: undefined,
};
const PlacesContainer = (props: PlacesContainerProps) => {
  //! State
  const { filters, handleSearch } = useFiltersHandler(initialFilters);
  const { data, isLoading } = useGetVendorList(filters);

  const listOfPlaces = data?.items || [];
  const total = data?.totalItems || 0;

  const initialValues = VendorClientFilter.parseInitialValues(filters);

  //! Function

  //! Render
  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur
      validateOnChange
      onSubmit={(values) => {
        const requestPayload = VendorClientFilter.parseBodyToRequest(values);
        handleSearch({ ...filters, ...requestPayload });
      }}
      // enableReinitializes
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
              <CommonStylesClient.Box sx={{ width: 248 }}>
                <Filters
                  afterOnChange={() => {
                    timerInputSearch.debounce(() => {
                      propsFormik.handleSubmit();
                    }, 1000);
                  }}
                />
              </CommonStylesClient.Box>
              <CommonStylesClient.Box sx={{ flexGrow: 1 }}>
                <PlacesList listOfPlaces={listOfPlaces} total={total} loading={isLoading} />
              </CommonStylesClient.Box>
            </CommonStylesClient.Box>
          </CommonStylesClient.Box>
          <CommonStyles.FormikDebug />
        </Form>
      )}
    </Formik>
  );
};

export default React.memo(PlacesContainer);
