import React from 'react';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import OrderItem from './OrderItem';
import Pagination from '../Pagination';
import { ReservationVendor } from 'modules/reservationVendor/reservationVendor.interface';

interface OrderListProps {
  orderList: ReservationVendor[];
  totalItems: number;
  page: number;
  perPage: number;
  totalPage: number;
  onChange: (_: unknown, nextPage: number) => void;
}

const OrderList = (props: OrderListProps) => {
  const { totalItems, page, perPage, totalPage, onChange, orderList } = props;
  //! State

  //! Function

  //! Render
  return (
    <CommonStylesClient.Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <CommonStylesClient.Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem 2rem' }}>
        {orderList.map((el: ReservationVendor) => {
          return <OrderItem key={el?.id} itemOrder={el} />;
        })}
      </CommonStylesClient.Box>

      <Pagination
        count={totalPage}
        page={page}
        countDataInpage={orderList.length}
        perPage={perPage}
        onChange={onChange}
        totalItems={totalItems}
      />
    </CommonStylesClient.Box>
  );
};

export default React.memo(OrderList);
