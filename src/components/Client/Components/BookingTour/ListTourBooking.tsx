import CommonStylesClient from 'components/Client/CommonStylesClient';
import { BookingTour } from 'modules/bookingTour/bookingTour.interface';
import React from 'react';
import TourBookingItem from './TourBookingItem';
import Pagination from '../Pagination';

interface ListTourBookingProps {
  tourBooking: BookingTour[];
  totalItems: number;
  page: number;
  perPage: number;
  totalPage: number;
  onChange: (_: unknown, nextPage: number) => void;
}

const ListTourBooking = (props: ListTourBookingProps) => {
  //! State
  const { tourBooking, totalItems, page, perPage, totalPage, onChange } = props;

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box>
      <CommonStylesClient.Box
        sx={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}
      >
        {tourBooking?.map((el: BookingTour) => {
          return <TourBookingItem key={el?.id} item={el} />;
        })}
      </CommonStylesClient.Box>

      <Pagination
        count={totalPage}
        page={page}
        countDataInpage={tourBooking.length}
        perPage={perPage}
        onChange={onChange}
        totalItems={totalItems}
      />
    </CommonStylesClient.Box>
  );
};

export default React.memo(ListTourBooking);
